#!/bin/bash

# 启动Web3导航网站本地预览服务器
# 此脚本用于在macOS和Linux系统上快速启动本地预览服务器

echo "正在启动Web3导航网站预览服务器..."

# 检查Python是否安装
if command -v python3 &>/dev/null; then
    python3 server.py
elif command -v python &>/dev/null; then
    python server.py
else
    echo "错误: 未找到Python。请安装Python 3后再试。"
    exit 1
fi