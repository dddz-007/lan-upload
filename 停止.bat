@echo off
chcp 65001 >nul

title 停止局域网文件互传

echo.
echo  正在停止服务...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /PID %%a /F >nul 2>nul
)

echo  服务已停止。
echo.
pause
