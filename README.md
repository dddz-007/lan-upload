# lan-upload

局域网文件互传工具。在同一 WiFi 下，用手机或电脑浏览器上传任意格式、任意大小的文件，上传后可点击文件名下载。

## 功能

- 支持任意文件格式，无大小限制
- 移动端适配，手机浏览器可直接上传
- 上传进度实时显示
- 文件列表展示，点击文件名即可下载
- 局域网内多设备访问

## 快速开始

### 环境要求

- Node.js 18+

### 安装

```bash
git clone https://github.com/dddz-007/lan-upload.git
cd lan-upload
npm install
```

### 启动

```bash
npm start
```

启动后访问：

- 本机：http://localhost:3000
- 手机（同一 WiFi）：http://<电脑局域网 IP>:3000

Windows 查看本机 IP：

```powershell
ipconfig
```

找到当前网络的 IPv4 地址即可。

## 使用说明

1. 在浏览器打开上述地址
2. 点击「选择文件上传」，选择要传输的文件
3. 等待上传完成，文件会出现在下方列表
4. 点击文件名即可下载

## 项目结构

```
lan-upload/
├── index.html      # 前端页面
├── server.js       # 后端服务（Express + Multer）
├── uploads/        # 上传文件存储目录（自动创建，不纳入 Git）
├── package.json
└── README.md
```

## API

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/upload` | POST | 上传文件，字段名 `file` |
| `/api/files` | GET | 获取已上传文件列表 |
| `/api/download/:filename` | GET | 下载指定文件 |

## 注意事项

- 上传的文件保存在本地 `uploads/` 目录
- 手机访问需与电脑在同一局域网
- 若手机无法访问，请检查 Windows 防火墙是否放行 3000 端口
- 大文件上传耗时较长，请保持页面不要关闭

## License

MIT
