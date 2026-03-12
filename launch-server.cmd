@echo off
setlocal

set "ROOT=%~dp0"
set "URL=http://127.0.0.1:4173/index.html"

rem If the app already responds, just open it in the browser.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "try { $response = Invoke-WebRequest -UseBasicParsing '%URL%' -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if %ERRORLEVEL% EQU 0 (
  start "" "%URL%"
  exit /b 0
)

rem Launch the static server in a separate PowerShell window rooted at the project folder.
start "TBR Warfare Server" powershell -NoExit -ExecutionPolicy Bypass -Command ^
  "Set-Location -LiteralPath '%ROOT%'; py -m http.server 4173 --bind 127.0.0.1"

rem Give the server a moment to bind before opening the app.
timeout /t 2 /nobreak >nul
start "" "%URL%"
