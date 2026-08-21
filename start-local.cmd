@echo off
REM ---------------------------------------------------------------
REM  CaseFilePrep - start the local dev server and open the browser
REM  Double-click this file, or run it from a terminal.
REM ---------------------------------------------------------------

cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies for the first time...
  call npm install
)

echo.
echo Starting CaseFilePrep on http://localhost:3011
echo Keep this window open. Press Ctrl+C to stop the server.
echo.

REM Give Next a few seconds to boot, then open the browser.
start "" /b cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:3011"

call npm run dev
