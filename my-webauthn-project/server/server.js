// ���� Express
const express = require('express');
const path = require('path');

// ���� Express Ӧ��
const app = express();

// ����˿ں�
const PORT = process.env.PORT || 3000;

// ���þ�̬�ļ�����
app.use(express.static('public'));

// ·�����ã�Ϊ��վ��Ŀ¼����һ���򵥵���Ӧ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ����������
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
