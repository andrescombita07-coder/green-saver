param(
    [string]$BackendPath = "C:\Users\combi\greensaver-backend\backend",
    [string]$FrontendPath = "C:\Users\combi\green-saver",
    [string]$MysqlExe = "C:\xampp\mysql\bin\mysqld.exe",
    [string]$MysqlConfig = "C:\xampp\mysql\bin\my.ini",
    [string]$DatabasePort = "3308",
    [string]$ApiPort = "8000"
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $MysqlExe)) {
    throw "No se encontró mysqld en: $MysqlExe"
}

if (-not (Test-Path $MysqlConfig)) {
    throw "No se encontró my.ini en: $MysqlConfig"
}

$mysqlRunning = Get-Process mysqld, mariadbd -ErrorAction SilentlyContinue
if (-not $mysqlRunning) {
    Start-Process -FilePath $MysqlExe -ArgumentList "--defaults-file=$MysqlConfig", "--console" -WindowStyle Hidden
}

$backendEnv = @"
`$env:DB_PORT='$DatabasePort'
Set-Location '$BackendPath'
& c:/python314/python.exe -m uvicorn main:app --reload --port $ApiPort
"@

$frontendEnv = @"
`$env:EXPO_PUBLIC_API_URL='http://127.0.0.1:$ApiPort'
Set-Location '$FrontendPath'
npm start
"@

Start-Process -FilePath powershell -ArgumentList @('-NoExit', '-Command', $backendEnv)
Start-Process -FilePath powershell -ArgumentList @('-NoExit', '-Command', $frontendEnv)

Write-Host 'Servicios iniciados:'
Write-Host '- MariaDB/XAMPP (si no estaba activo)'
Write-Host "- Backend FastAPI en http://127.0.0.1:$ApiPort"
Write-Host '- Frontend Expo en el puerto disponible'
