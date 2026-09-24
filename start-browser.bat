@echo off
echo Starting isolated browser sandbox...
docker compose up -d
echo.
echo ========================================================
echo Browser container is running!
echo Access the browser web GUI at: http://localhost:3000
echo ========================================================
echo.
pause
