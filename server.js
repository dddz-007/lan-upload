const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safeName = path.basename(file.originalname);
    cb(null, safeName);
  },
});

const upload = multer({ storage });

app.use(express.static(__dirname));

app.get('/api/files', (_req, res) => {
  const files = fs
    .readdirSync(UPLOAD_DIR)
    .filter((f) => fs.statSync(path.join(UPLOAD_DIR, f)).isFile())
    .map((name) => {
      const stat = fs.statSync(path.join(UPLOAD_DIR, name));
      return { name, size: stat.size, uploadTime: stat.mtime };
    })
    .sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));

  res.json(files);
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '未选择文件' });
  }
  res.json({ name: req.file.filename, size: req.file.size });
});

app.get('/api/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  res.download(filePath, filename);
});

app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: '文件过大，上传被拒绝' });
  }
  res.status(400).json({ error: err.message || '上传失败' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
  console.log(`局域网访问: http://<本机IP>:${PORT}`);
});

server.timeout = 0;
server.requestTimeout = 0;
server.headersTimeout = 0;
