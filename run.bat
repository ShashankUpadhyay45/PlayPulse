@echo off
echo ==========================================
echo ?? Launching PlayPulse Multi-Sport Hub
echo ==========================================
echo.
echo Starting Express Backend on port 4000...
start "PlayPulse Backend" cmd /k "cd server && node index.js"

echo Starting React Frontend on port 3001...
start "PlayPulse Frontend" cmd /k "cd client && npm start"

echo.
echo Both services are booting up!
echo Close the newly opened terminal windows to stop the servers.
echo ==========================================
