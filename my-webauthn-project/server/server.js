// 引入 Express
const express = require('express');
const path = require('path');

// 创建 Express 应用
const app = express();

// 定义端口号
const PORT = process.env.PORT || 3000;

// 设置静态文件服务
app.use(express.static('public'));

// 路由配置，为网站根目录设置一个简单的响应
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
