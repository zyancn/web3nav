@echo off
REM 启动Web3导航网站本地预览服务器
REM 此脚本用于在Windows系统上快速启动本地预览服务器

echo 正在启动Web3导航网站预览服务器...

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python server.py
) else (
    python3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        python3 server.py
    ) else (
        echo 错误: 未找到Python。请安装Python 3后再试。
        pause
        exit /b 1
    )
)

pause