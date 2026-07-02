# ===============================
# PlayPulse / Scorecard Full Auto Repair & Launch Script
# ===============================

Write-Host "=== Starting Full Fix and Launch Script ===" -ForegroundColor Cyan

# --- Kill all Node.js processes ---
Write-Host "Stopping any running Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# --- Clean node_modules and cache ---
Write-Host "Cleaning old node_modules and npm cache..." -ForegroundColor Yellow
if (Test-Path "client\node_modules") { Remove-Item -Recurse -Force "client\node_modules" }
if (Test-Path "server\node_modules") { Remove-Item -Recurse -Force "server\node_modules" }
if (Test-Path "client\package-lock.json") { Remove-Item -Force "client\package-lock.json" }
if (Test-Path "server\package-lock.json") { Remove-Item -Force "server\package-lock.json" }

npm cache clean --force | Out-Null

# --- Install dependencies ---
Write-Host "Installing dependencies for server..." -ForegroundColor Yellow
Set-Location "server"
npm install express cors axios dotenv body-parser | Out-Host
Set-Location ..

Write-Host "Installing dependencies for client..." -ForegroundColor Yellow
Set-Location "client"
npm install react react-dom react-router-dom react-icons framer-motion react-scripts | Out-Host
Set-Location ..

# --- Check if ports are free ---
Write-Host "Checking if ports 3000 and 4000 are free..." -ForegroundColor Yellow
$ports = @("3000", "4000")
foreach ($port in $ports) {
    $used = netstat -ano | findstr ":$port"
    if ($used) {
        Write-Host "Port $port is in use. Freeing it..." -ForegroundColor Red
        $pid = ($used -split '\s+')[-1]
        taskkill /PID $pid /F | Out-Null
    }
}

# --- Start server ---
Write-Host "Starting backend server on port 4000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "cd 'server'; node index.js" -WindowStyle Minimized

# --- Start React client ---
Write-Host "Starting frontend client on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "cd 'client'; npm start" -WindowStyle Normal

# --- Done ---
Write-Host "`n✅ Setup complete! Your project should open in the browser shortly." -ForegroundColor Cyan
Write-Host "If it doesn't, open manually: http://localhost:3000" -ForegroundColor Green


192 
193
00245
283
280
