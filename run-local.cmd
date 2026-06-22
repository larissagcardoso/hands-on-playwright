@echo off
setlocal

set "PATH=C:\Program Files\nodejs;%PATH%"
set "ENV=qa"

cd /d "%~dp0"
"C:\Program Files\nodejs\npx.cmd" playwright test --project=chromium --workers=1

endlocal
