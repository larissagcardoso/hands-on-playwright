@echo off
setlocal

set "PATH=C:\Program Files\nodejs;%PATH%"

"C:\Program Files\nodejs\node.exe" --version
"C:\Program Files\nodejs\npm.cmd" --version
"C:\Program Files\nodejs\npx.cmd" --version

endlocal
