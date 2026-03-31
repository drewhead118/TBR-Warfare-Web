$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$sourceTexturePaths = @{
  dirt = (Resolve-Path "assets/Textures/dirt.png").Path
  grass = (Resolve-Path "assets/Textures/grass.png").Path
  sand = (Resolve-Path "assets/Textures/sand.png").Path
  stone = (Resolve-Path "assets/Textures/stone.png").Path
}

$arenaTextureProfileByName = @{
  "Sunlit Vale" = "meadow"
  "Moss March" = "wetland"
  "Copper Plain" = "rocky"
  "Blue Fen" = "wetland"
  "Rose Dunes" = "dunes"
  "Jade Steppe" = "meadow"
  "Violet Moor" = "moor"
  "Ashen Reach" = "rocky"
  "Auric Flats" = "dunes"
  "Nightglass Basin" = "rocky"
  "Cinder Scar" = "rocky"
  "Thornwild Verge" = "meadow"
  "Ivory Saltpan" = "dunes"
  "Saffron Breakers" = "dunes"
  "Moonroot Hollow" = "wetland"
}

$groundTextureProfilePresets = @{
  meadow = @{
    weights = @{ grass = 6.0; dirt = 3.0; stone = 1.0; sand = 1.0 }
    tileSize = @(125.0, 190.0)
    softLightAlpha = 0.5
    multiplyAlpha = 0.18
  }
  wetland = @{
    weights = @{ grass = 4.0; dirt = 4.0; stone = 2.0; sand = 1.0 }
    tileSize = @(118.0, 176.0)
    softLightAlpha = 0.46
    multiplyAlpha = 0.22
  }
  dunes = @{
    weights = @{ sand = 7.0; stone = 2.0; dirt = 2.0; grass = 1.0 }
    tileSize = @(132.0, 208.0)
    softLightAlpha = 0.42
    multiplyAlpha = 0.14
  }
  rocky = @{
    weights = @{ stone = 6.0; dirt = 3.0; sand = 2.0; grass = 1.0 }
    tileSize = @(120.0, 174.0)
    softLightAlpha = 0.38
    multiplyAlpha = 0.26
  }
  moor = @{
    weights = @{ grass = 3.0; stone = 3.0; dirt = 4.0; sand = 1.0 }
    tileSize = @(112.0, 168.0)
    softLightAlpha = 0.44
    multiplyAlpha = 0.2
  }
}

$arenaTextureProfileOverrides = @{
  "Sunlit Vale" = @{ tileSize = @(132.0, 186.0); materialMasks = @{} }
  "Moss March" = @{ tileSize = @(104.0, 150.0); materialMasks = @{} }
  "Copper Plain" = @{ tileSize = @(118.0, 166.0); materialMasks = @{} }
  "Blue Fen" = @{ tileSize = @(110.0, 158.0); materialMasks = @{} }
  "Rose Dunes" = @{ tileSize = @(146.0, 218.0); materialMasks = @{} }
  "Jade Steppe" = @{ tileSize = @(136.0, 194.0); materialMasks = @{} }
  "Violet Moor" = @{ tileSize = @(104.0, 154.0); materialMasks = @{} }
  "Ashen Reach" = @{ tileSize = @(112.0, 160.0); materialMasks = @{} }
  "Auric Flats" = @{ tileSize = @(150.0, 224.0); materialMasks = @{} }
  "Nightglass Basin" = @{ tileSize = @(100.0, 148.0); materialMasks = @{} }
  "Cinder Scar" = @{ tileSize = @(108.0, 152.0); materialMasks = @{} }
  "Thornwild Verge" = @{ tileSize = @(124.0, 176.0); materialMasks = @{} }
  "Ivory Saltpan" = @{ tileSize = @(154.0, 232.0); materialMasks = @{} }
  "Saffron Breakers" = @{ tileSize = @(142.0, 210.0); materialMasks = @{} }
  "Moonroot Hollow" = @{ tileSize = @(102.0, 146.0); materialMasks = @{} }
}

$mapDefinitions = @(
  @{ id = "01-sunlit-vale"; arenaName = "Sunlit Vale" }
  @{ id = "02-moss-march"; arenaName = "Moss March" }
  @{ id = "03-copper-plain"; arenaName = "Copper Plain" }
  @{ id = "04-blue-fen"; arenaName = "Blue Fen" }
  @{ id = "05-rose-dunes"; arenaName = "Rose Dunes" }
  @{ id = "06-jade-steppe"; arenaName = "Jade Steppe" }
  @{ id = "07-violet-moor"; arenaName = "Violet Moor" }
  @{ id = "08-ashen-reach"; arenaName = "Ashen Reach" }
  @{ id = "09-auric-flats"; arenaName = "Auric Flats" }
  @{ id = "10-nightglass-basin"; arenaName = "Nightglass Basin" }
  @{ id = "11-cinder-scar"; arenaName = "Cinder Scar" }
  @{ id = "12-thornwild-verge"; arenaName = "Thornwild Verge" }
  @{ id = "13-ivory-saltpan"; arenaName = "Ivory Saltpan" }
  @{ id = "14-saffron-breakers"; arenaName = "Saffron Breakers" }
  @{ id = "15-moonroot-hollow"; arenaName = "Moonroot Hollow" }
)

$csharp = @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public sealed class TerrainMaterial
{
    public string TextureId { get; set; }
    public double ScaleMultiplier { get; set; }
    public double ThresholdLow { get; set; }
    public double ThresholdHigh { get; set; }
    public double Feather { get; set; }
    public int Octaves { get; set; }
    public double Persistence { get; set; }
    public double Lacunarity { get; set; }
    public double Warp { get; set; }
    public double Alpha { get; set; }
}

public sealed class TerrainProfile
{
    public string Key { get; set; }
    public string BaseTexture { get; set; }
    public double[] TileSize { get; set; }
    public double SoftLightAlpha { get; set; }
    public double MultiplyAlpha { get; set; }
    public List<TerrainMaterial> MaterialMasks { get; set; }
}

public static class TerrainBakeHost
{
    public static uint HashStringToSeed(string input)
    {
        uint hash = 2166136261;
        foreach (char c in input)
        {
            hash ^= c;
            hash *= 16777619;
        }
        return hash;
    }

    public sealed class SeededRandom
    {
        private uint value;

        public SeededRandom(uint seed)
        {
            value = seed;
        }

        public double Next()
        {
            value = unchecked(value + 0x6D2B79F5);
            uint next = value;
            next = (uint)(Math.BigMul((int)(next ^ (next >> 15)), (int)(next | 1)) & 0xFFFFFFFF);
            next ^= (uint)(next + (uint)(Math.BigMul((int)(next ^ (next >> 7)), (int)(next | 61)) & 0xFFFFFFFF));
            return ((next ^ (next >> 14)) & 0xFFFFFFFF) / 4294967296.0;
        }
    }

    public static double RandomRange(SeededRandom rand, double min, double max)
    {
        return min + ((max - min) * rand.Next());
    }

    private static double Smoothstep(double min, double max, double value)
    {
        if (max <= min) return value >= max ? 1 : 0;
        double t = Math.Max(0, Math.Min(1, (value - min) / (max - min)));
        return t * t * (3 - (2 * t));
    }

    private static double Lerp(double a, double b, double t)
    {
        return a + ((b - a) * t);
    }

    private static double HashGridNoise(uint seed, int x, int y)
    {
        uint hash = seed ^ (uint)(x * 374761393) ^ (uint)(y * 668265263);
        hash = (hash ^ (hash >> 13)) & 0xFFFFFFFF;
        hash = (uint)(Math.BigMul((int)hash, 1274126177) & 0xFFFFFFFF);
        return ((hash ^ (hash >> 16)) & 0xFFFFFFFF) / 4294967295.0;
    }

    private static double SampleValueNoise(uint seed, double x, double y)
    {
        int x0 = (int)Math.Floor(x);
        int y0 = (int)Math.Floor(y);
        int x1 = x0 + 1;
        int y1 = y0 + 1;
        double tx = x - x0;
        double ty = y - y0;
        double sx = tx * tx * (3 - (2 * tx));
        double sy = ty * ty * (3 - (2 * ty));
        double n00 = HashGridNoise(seed, x0, y0);
        double n10 = HashGridNoise(seed, x1, y0);
        double n01 = HashGridNoise(seed, x0, y1);
        double n11 = HashGridNoise(seed, x1, y1);
        return Lerp(Lerp(n00, n10, sx), Lerp(n01, n11, sx), sy);
    }

    private static double SampleFractalTerrainNoise(uint seed, double x, double y, TerrainMaterial config)
    {
        double amplitude = 1;
        double frequency = 1;
        double total = 0;
        double totalAmplitude = 0;
        int octaves = Math.Max(1, config.Octaves);
        for (int octave = 0; octave < octaves; octave += 1)
        {
            total += SampleValueNoise(seed + (uint)(octave * 1013), x * frequency, y * frequency) * amplitude;
            totalAmplitude += amplitude;
            amplitude *= config.Persistence;
            frequency *= config.Lacunarity;
        }
        return totalAmplitude > 0 ? total / totalAmplitude : 0;
    }

    private static byte[] BuildMask(int width, int height, TerrainMaterial material, uint seed, double renderedTileSize)
    {
        byte[] mask = new byte[width * height];
        double scale = Math.Max(18, material.ScaleMultiplier * renderedTileSize);
        double warpAmount = material.Warp;
        double feather = Math.Max(0.01, material.Feather);
        double low = material.ThresholdLow;
        double high = material.ThresholdHigh;
        double alphaScale = material.Alpha;
        int index = 0;
        for (int y = 0; y < height; y += 1)
        {
            for (int x = 0; x < width; x += 1)
            {
                double nx = x / scale;
                double ny = y / scale;
                double warpX = (SampleFractalTerrainNoise(seed + 17, nx * 0.9, ny * 0.9, material) - 0.5) * warpAmount;
                double warpY = (SampleFractalTerrainNoise(seed + 29, (nx * 0.9) + 11.3, (ny * 0.9) + 7.1, material) - 0.5) * warpAmount;
                double value = SampleFractalTerrainNoise(seed, nx + warpX, ny + warpY, material);
                double lowerBlend = Smoothstep(low - feather, low + feather, value);
                double upperBlend = 1 - Smoothstep(high - feather, high + feather, value);
                double alpha = Math.Max(0, Math.Min(1, lowerBlend * upperBlend * alphaScale));
                mask[index++] = (byte)Math.Round(alpha * 255);
            }
        }
        return mask;
    }

    private static Bitmap CreateTiledBitmap(Bitmap texture, int width, int height, double tileHeight)
    {
        Bitmap bitmap = new Bitmap(width, height, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bitmap))
        using (TextureBrush brush = new TextureBrush(texture, WrapMode.Tile))
        {
            g.Clear(Color.Transparent);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            double tileWidth = tileHeight * (texture.Width / (double)Math.Max(1, texture.Height));
            Matrix matrix = new Matrix();
            matrix.Scale((float)(tileWidth / texture.Width), (float)(tileHeight / texture.Height));
            brush.Transform = matrix;
            g.FillRectangle(brush, 0, 0, width, height);
        }
        return bitmap;
    }

    private static void ApplyMaskedOverlay(Bitmap destination, Bitmap overlay, byte[] mask)
    {
        Rectangle rect = new Rectangle(0, 0, destination.Width, destination.Height);
        BitmapData destData = destination.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        BitmapData overlayData = overlay.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        int byteCount = Math.Abs(destData.Stride) * destination.Height;
        byte[] destBytes = new byte[byteCount];
        byte[] overlayBytes = new byte[byteCount];
        Marshal.Copy(destData.Scan0, destBytes, 0, byteCount);
        Marshal.Copy(overlayData.Scan0, overlayBytes, 0, byteCount);
        for (int y = 0; y < destination.Height; y += 1)
        {
            int rowOffset = y * destData.Stride;
            for (int x = 0; x < destination.Width; x += 1)
            {
                int pixelIndex = rowOffset + (x * 4);
                int maskIndex = (y * destination.Width) + x;
                double srcAlpha = mask[maskIndex] / 255.0;
                if (srcAlpha <= 0) continue;
                double dstAlpha = destBytes[pixelIndex + 3] / 255.0;
                double outAlpha = srcAlpha + (dstAlpha * (1 - srcAlpha));
                if (outAlpha <= 0) continue;
                for (int channel = 0; channel < 3; channel += 1)
                {
                    double src = overlayBytes[pixelIndex + channel] / 255.0;
                    double dst = destBytes[pixelIndex + channel] / 255.0;
                    double blended = ((src * srcAlpha) + (dst * dstAlpha * (1 - srcAlpha))) / outAlpha;
                    destBytes[pixelIndex + channel] = (byte)Math.Round(Math.Max(0, Math.Min(1, blended)) * 255);
                }
                destBytes[pixelIndex + 3] = (byte)Math.Round(Math.Max(0, Math.Min(1, outAlpha)) * 255);
            }
        }
        Marshal.Copy(destBytes, 0, destData.Scan0, byteCount);
        destination.UnlockBits(destData);
        overlay.UnlockBits(overlayData);
    }

    public static void Render(string outputPath, string arenaName, TerrainProfile profile, Dictionary<string, string> texturePaths, int width, int height, int resolutionScale)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
        SeededRandom rand = new SeededRandom(HashStringToSeed(arenaName + "|" + profile.Key));
        double sharedTileSize = RandomRange(rand, profile.TileSize[0], profile.TileSize[1]) * 0.2 * resolutionScale;
        using (Bitmap canvas = new Bitmap(width, height, PixelFormat.Format32bppArgb))
        using (Graphics g = Graphics.FromImage(canvas))
        using (Bitmap baseTexture = new Bitmap(texturePaths[profile.BaseTexture]))
        using (Bitmap basePlane = CreateTiledBitmap(baseTexture, width, height, sharedTileSize))
        {
            g.Clear(Color.Transparent);
            g.DrawImage(basePlane, 0, 0);
            for (int index = 0; index < profile.MaterialMasks.Count; index += 1)
            {
                TerrainMaterial material = profile.MaterialMasks[index];
                uint maskSeed = HashStringToSeed(profile.Key + "|" + profile.BaseTexture + "|" + material.TextureId + "|" + index);
                byte[] mask = BuildMask(width, height, material, maskSeed, sharedTileSize);
                using (Bitmap materialTexture = new Bitmap(texturePaths[material.TextureId]))
                using (Bitmap overlayPlane = CreateTiledBitmap(materialTexture, width, height, sharedTileSize))
                {
                    ApplyMaskedOverlay(canvas, overlayPlane, mask);
                }
            }
            canvas.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing

function Get-HashStringToSeed([string]$input) {
  $hash = [uint32]2166136261
  foreach ($char in $input.ToCharArray()) {
    $hash = [uint32](($hash -bxor [uint32][int][char]$char) * 16777619)
  }
  return $hash
}

function New-SeededRandom([uint32]$seed) {
  return [TerrainBakeHost+SeededRandom]::new($seed)
}

function Get-DominantWeightedTextureId($weights, [string]$fallback = "grass") {
  $selectedId = $fallback
  $selectedWeight = [double]::NegativeInfinity
  foreach ($entry in $weights.GetEnumerator()) {
    if ([double]$entry.Value -gt $selectedWeight) {
      $selectedId = $entry.Key
      $selectedWeight = [double]$entry.Value
    }
  }
  return $selectedId
}

function Remove-TextureFromWeights($weights, [string]$textureId) {
  $result = @{}
  foreach ($entry in $weights.GetEnumerator()) {
    if ($entry.Key -ne $textureId -and [double]$entry.Value -gt 0) {
      $result[$entry.Key] = [double]$entry.Value
    }
  }
  return $result
}

function Clone-NumberRange($range, $fallback) {
  if ($null -ne $range -and $range.Count -ge 2) {
    return @([double]$range[0], [double]$range[1])
  }
  return @([double]$fallback[0], [double]$fallback[1])
}

function New-TerrainMaterialMaskConfigs([string]$name, $replacementWeights, $overrides = @{}) {
  $entries = @(
    foreach ($entry in $replacementWeights.GetEnumerator() | Sort-Object Value -Descending) {
      if ([double]$entry.Value -gt 0) { $entry }
    }
  )
  $materials = New-Object 'System.Collections.Generic.List[TerrainMaterial]'
  for ($index = 0; $index -lt $entries.Count; $index += 1) {
    $entry = $entries[$index]
    $textureId = $entry.Key
    $weight = [double]$entry.Value
    $seedRand = New-SeededRandom (Get-HashStringToSeed "$name|$textureId|$index")
    $bandBase = 0.2 + ($index * 0.14) + $seedRand.Next() * 0.04
    $bandWidth = 0.18 + $seedRand.Next() * 0.08
    $override = if ($overrides.ContainsKey($textureId)) { $overrides[$textureId] } else { @{} }
    $thresholdLow = if ($override.ContainsKey("thresholdLow")) { [double]$override.thresholdLow } else { $bandBase }
    $defaultThresholdHigh = [Math]::Min(0.92, $bandBase + $bandWidth)
    $thresholdHigh = if ($override.ContainsKey("thresholdHigh")) { [double]$override.thresholdHigh } else { $defaultThresholdHigh }
    $thresholdHigh = [Math]::Max($thresholdLow + 0.04, $thresholdHigh)
    $material = [TerrainMaterial]::new()
    $material.TextureId = $textureId
    $material.ScaleMultiplier = if ($override.ContainsKey("scaleMultiplier")) { [double]$override.scaleMultiplier } else { 7.5 + ($index * 2.1) + $seedRand.Next() * 2.4 }
    $material.ThresholdLow = $thresholdLow
    $material.ThresholdHigh = $thresholdHigh
    $material.Feather = if ($override.ContainsKey("feather")) { [double]$override.feather } else { 0.035 + $seedRand.Next() * 0.04 }
    $material.Octaves = if ($override.ContainsKey("octaves")) { [int]$override.octaves } else { 3 + [Math]::Floor($seedRand.Next() * 2) }
    $material.Persistence = if ($override.ContainsKey("persistence")) { [double]$override.persistence } else { 0.48 + $seedRand.Next() * 0.18 }
    $material.Lacunarity = if ($override.ContainsKey("lacunarity")) { [double]$override.lacunarity } else { 1.9 + $seedRand.Next() * 0.45 }
    $material.Warp = if ($override.ContainsKey("warp")) { [double]$override.warp } else { 0.12 + $seedRand.Next() * 0.18 }
    $material.Alpha = if ($override.ContainsKey("alpha")) { [double]$override.alpha } else { 0.72 + [Math]::Min(0.16, $weight * 0.025) }
    $materials.Add($material)
  }
  return $materials
}

function New-ArenaTextureProfile([string]$name) {
  $presetKey = if ($arenaTextureProfileByName.ContainsKey($name)) { $arenaTextureProfileByName[$name] } else { "meadow" }
  $preset = $groundTextureProfilePresets[$presetKey]
  $override = if ($arenaTextureProfileOverrides.ContainsKey($name)) { $arenaTextureProfileOverrides[$name] } else { @{} }
  $weights = @{}
  foreach ($entry in $preset.weights.GetEnumerator()) {
    $weights[$entry.Key] = [double]$entry.Value
  }
  $baseTexture = if ($override.baseTexture) { [string]$override.baseTexture } else { Get-DominantWeightedTextureId $weights "grass" }
  $replacementWeights = if ($override.replacementWeights) { $override.replacementWeights } else { Remove-TextureFromWeights $weights $baseTexture }
  $tileSize = Clone-NumberRange $override.tileSize $preset.tileSize
  $profile = [TerrainProfile]::new()
  $profile.Key = $presetKey
  $profile.BaseTexture = $baseTexture
  $profile.TileSize = [double[]]$tileSize
  $profile.SoftLightAlpha = [double]$preset.softLightAlpha
  $profile.MultiplyAlpha = [double]$preset.multiplyAlpha
  $profile.MaterialMasks = New-TerrainMaterialMaskConfigs $name $replacementWeights $override.materialMasks
  return $profile
}

$sourceTextureLookup = New-Object 'System.Collections.Generic.Dictionary[string,string]'
foreach ($entry in $sourceTexturePaths.GetEnumerator()) {
  $sourceTextureLookup[$entry.Key] = [string]$entry.Value
}
$outputDirectory = Join-Path (Resolve-Path ".").Path "assets\prebuilt-terrain"
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$manifest = @()
foreach ($map in $mapDefinitions) {
  $outputPath = Join-Path $outputDirectory ($map.id + ".png")
  $profile = New-ArenaTextureProfile $map.arenaName
  [TerrainBakeHost]::Render($outputPath, $map.arenaName, $profile, $sourceTextureLookup, 3540, 2280, 3)
  $manifest += [pscustomobject]@{
    id = $map.id
    arenaName = $map.arenaName
    path = "assets/prebuilt-terrain/$($map.id).png"
    profile = [pscustomobject]@{
      key = $profile.Key
      baseTexture = $profile.BaseTexture
      tileSize = @($profile.TileSize[0], $profile.TileSize[1])
      softLightAlpha = $profile.SoftLightAlpha
      multiplyAlpha = $profile.MultiplyAlpha
    }
  }
  Write-Host ("Baked " + $map.id)
}

$manifest | ConvertTo-Json -Depth 6 | Set-Content -Path (Join-Path $outputDirectory "manifest.json")






