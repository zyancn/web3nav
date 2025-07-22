#!/usr/bin/env python3
"""
简单的HTTP服务器，用于本地预览Web3工具箱网站
使用方法：python server.py
然后在浏览器中访问 http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

# 配置服务器端口
PORT = 8000

# 获取当前目录作为服务器根目录
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# 创建处理程序
Handler = http.server.SimpleHTTPRequestHandler

# 创建服务器
with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
    print(f"服务器启动在 http://localhost:{PORT}")
    print(f"按 Ctrl+C 停止服务器")
    
    # 自动在默认浏览器中打开网站
    webbrowser.open(f"http://localhost:{PORT}")
    
    # 启动服务器
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")