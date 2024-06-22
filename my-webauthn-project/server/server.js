const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = {};

app.post('/register', (req, res) => {
    const { id, rawId, type, response } = req.body;
    users[id] = { rawId, type, response };
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({ status: 'ok' });
});

app.post('/login', (req, res) => {
    const { id, rawId, type, response } = req.body;
    if (users[id] && users[id].rawId.toString() === rawId.toString()) {
        res.json({ status: 'ok' });
    } else {
        res.json({ status: 'failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
