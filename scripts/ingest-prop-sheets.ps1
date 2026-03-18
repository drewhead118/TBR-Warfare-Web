param(
  [string]$IngestDir = "assets/Props_ingest",
  [string]$OutputDir = "assets/Props",
  [int]$AlphaThreshold = 10,
  [int]$MinPixels = 60,
  [int]$Padding = 2,
  [switch]$DeleteSourceSheets = $true
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$csharp = @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public sealed class ExtractedPropInfo
{
    public string FileName { get; set; }
    public string SourceSheet { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int PixelCount { get; set; }
}

public static class PropSheetIngestor
{
    public static List<ExtractedPropInfo> IngestDirectory(string inputDir, string outputDir, int startIndex, int alphaThreshold, int minPixels, int padding)
    {
        var results = new List<ExtractedPropInfo>();
        var files = Directory.GetFiles(inputDir, "*.png");
        Array.Sort(files, StringComparer.OrdinalIgnoreCase);

        var nextIndex = startIndex;
        foreach (var file in files)
        {
            results.AddRange(IngestFile(file, outputDir, ref nextIndex, alphaThreshold, minPixels, padding));
        }

        return results;
    }

    private static List<ExtractedPropInfo> IngestFile(string inputPath, string outputDir, ref int nextIndex, int alphaThreshold, int minPixels, int padding)
    {
        var results = new List<ExtractedPropInfo>();
        using (var source = LoadArgbBitmap(inputPath))
        {
            var width = source.Width;
            var height = source.Height;
            var sourceRect = new Rectangle(0, 0, width, height);
            var sourceData = source.LockBits(sourceRect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            try
            {
                var stride = sourceData.Stride;
                var sourceBytes = new byte[stride * height];
                Marshal.Copy(sourceData.Scan0, sourceBytes, 0, sourceBytes.Length);

                var solid = new bool[width * height];
                for (var y = 0; y < height; y++)
                {
                    var rowOffset = y * stride;
                    for (var x = 0; x < width; x++)
                    {
                        var pixelOffset = rowOffset + (x * 4);
                        var alpha = sourceBytes[pixelOffset + 3];
                        solid[(y * width) + x] = alpha > alphaThreshold;
                    }
                }

                var visited = new bool[solid.Length];
                var queue = new Queue<int>();
                var componentPixels = new List<int>(256);

                for (var index = 0; index < solid.Length; index++)
                {
                    if (!solid[index] || visited[index])
                    {
                        continue;
                    }

                    queue.Clear();
                    componentPixels.Clear();
                    visited[index] = true;
                    queue.Enqueue(index);

                    var minX = width;
                    var minY = height;
                    var maxX = 0;
                    var maxY = 0;

                    while (queue.Count > 0)
                    {
                        var current = queue.Dequeue();
                        componentPixels.Add(current);

                        var x = current % width;
                        var y = current / width;

                        if (x < minX) minX = x;
                        if (y < minY) minY = y;
                        if (x > maxX) maxX = x;
                        if (y > maxY) maxY = y;

                        for (var ny = Math.Max(0, y - 1); ny <= Math.Min(height - 1, y + 1); ny++)
                        {
                            for (var nx = Math.Max(0, x - 1); nx <= Math.Min(width - 1, x + 1); nx++)
                            {
                                var neighbor = (ny * width) + nx;
                                if (visited[neighbor] || !solid[neighbor])
                                {
                                    continue;
                                }

                                visited[neighbor] = true;
                                queue.Enqueue(neighbor);
                            }
                        }
                    }

                    if (componentPixels.Count < minPixels)
                    {
                        continue;
                    }

                    var outputWidth = (maxX - minX + 1) + (padding * 2);
                    var outputHeight = (maxY - minY + 1) + (padding * 2);
                    var outputStride = outputWidth * 4;
                    var outputBytes = new byte[outputStride * outputHeight];

                    foreach (var pixelIndex in componentPixels)
                    {
                        var x = pixelIndex % width;
                        var y = pixelIndex / width;
                        var sourceOffset = (y * stride) + (x * 4);
                        var destX = (x - minX) + padding;
                        var destY = (y - minY) + padding;
                        var destOffset = (destY * outputStride) + (destX * 4);
                        Buffer.BlockCopy(sourceBytes, sourceOffset, outputBytes, destOffset, 4);
                    }

                    using (var output = new Bitmap(outputWidth, outputHeight, PixelFormat.Format32bppArgb))
                    {
                        var outputRect = new Rectangle(0, 0, outputWidth, outputHeight);
                        var outputData = output.LockBits(outputRect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                        try
                        {
                            Marshal.Copy(outputBytes, 0, outputData.Scan0, outputBytes.Length);
                        }
                        finally
                        {
                            output.UnlockBits(outputData);
                        }

                        var fileName = nextIndex.ToString("0000") + ".png";
                        var outputPath = Path.Combine(outputDir, fileName);
                        output.Save(outputPath, ImageFormat.Png);
                        results.Add(new ExtractedPropInfo
                        {
                            FileName = fileName,
                            SourceSheet = Path.GetFileName(inputPath),
                            Width = outputWidth,
                            Height = outputHeight,
                            PixelCount = componentPixels.Count
                        });
                    }

                    nextIndex++;
                }
            }
            finally
            {
                source.UnlockBits(sourceData);
            }
        }

        return results;
    }

    private static Bitmap LoadArgbBitmap(string path)
    {
        using (var raw = new Bitmap(path))
        {
            var normalized = new Bitmap(raw.Width, raw.Height, PixelFormat.Format32bppArgb);
            using (var graphics = Graphics.FromImage(normalized))
            {
                graphics.Clear(Color.Transparent);
                graphics.DrawImage(raw, 0, 0, raw.Width, raw.Height);
            }

            return normalized;
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing

$resolvedIngestDir = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $IngestDir))
$resolvedOutputDir = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputDir))

if (-not (Test-Path -LiteralPath $resolvedIngestDir)) {
  throw "Ingest directory not found: $resolvedIngestDir"
}

if (-not (Test-Path -LiteralPath $resolvedOutputDir)) {
  New-Item -ItemType Directory -Path $resolvedOutputDir | Out-Null
}

$existingIndex = Get-ChildItem -LiteralPath $resolvedOutputDir -Filter *.png -File -ErrorAction SilentlyContinue |
  Where-Object { $_.BaseName -match '^\d+$' } |
  ForEach-Object { [int]$_.BaseName } |
  Sort-Object -Descending |
  Select-Object -First 1

$startIndex = if ($null -ne $existingIndex) { $existingIndex + 1 } else { 1 }
$sourceSheets = Get-ChildItem -LiteralPath $resolvedIngestDir -Filter *.png -File | Sort-Object Name

if (-not $sourceSheets.Count) {
  Write-Output "No source sheets found in $resolvedIngestDir"
  exit 0
}

$results = [PropSheetIngestor]::IngestDirectory($resolvedIngestDir, $resolvedOutputDir, $startIndex, $AlphaThreshold, $MinPixels, $Padding)

if ($DeleteSourceSheets) {
  $sourceSheets | Remove-Item -Force
}

Write-Output ("Extracted {0} prop assets into {1}" -f $results.Count, $resolvedOutputDir)