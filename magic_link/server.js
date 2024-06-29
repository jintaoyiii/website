require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const USERS = [
  {
    id: 1,
    email: 'jintao.yi@ucdconnect.ie',
    name: 'eugene',
  },
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendMagicLinkEmail({ email, token }) {
  const link = `http://localhost:5173/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Magic Link',
    text: `Click this link to log in: ${link}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.post('/login', async (req, res) => {
  const user = USERS.find(u => u.email === req.body.email);

  if (user != null) {
    try {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      sendMagicLinkEmail({ email: user.email, token });

      res.send('Magic link sent!');
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('Email not registered');
  }
});

app.get('/verify', (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(400).send('Invalid or expired token');
    }

    const userId = decoded.userId;
    const user = USERS.find(u => u.id === userId);

    if (user) {
      res.send(`User ${user.name} logged in!`);
    } else {
      res.status(400).send('User not found');
    }
  });
});

app.listen(5173, () => {
  console.log('Server is running on http://localhost:5173');
});
