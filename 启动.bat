@echo off
chcp 65001 >nul
cd /d "%~dp0"

title 局域网文件互传

echo.
echo  ========================================
echo    局域网文件互传 - 正在启动...
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [错误] 未检测到 Node.js，无法运行本程序。
    echo.
    echo  请先安装 Node.js（安装时全部点下一步即可）：
    echo  https://nodejs.org/zh-cn
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo  首次运行，正在安装依赖，请稍候...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo  [错误] 依赖安装失败，请检查网络后重试。
        pause
        exit /b 1
    )
    echo.
    echo  依赖安装完成！
    echo.
)

echo  正在启动服务...
echo.

set "LOCAL_IP="
for /f "delims=" %%i in ('powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } | Select-Object -First 1 -ExpandProperty IPAddress)"') do set "LOCAL_IP=%%i"

if not defined LOCAL_IP (
    echo  [错误] 无法获取本机 IP，请检查网络连接。
    pause
    exit /b 1
)

echo  访问地址:  http://%LOCAL_IP%:3000
echo.
echo  ----------------------------------------
echo  浏览器将自动打开，请勿关闭本窗口。
echo  关闭本窗口 = 停止服务。
echo  ----------------------------------------
echo.

start "" http://%LOCAL_IP%:3000
node server.js

pause
