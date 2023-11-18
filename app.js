
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


console.log(process.env.EMAIL_SENDER);
const app = express();
EMAIL_SENDER = "kkffh54@gmail.com"
EMAIL_SENDER_PASSWORD = "ypjn scdl bzcx duyf"

port = 3000;

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send verification code and JWT by email
const sendVerificationCodeAndJwtByEmail = async (email) => {
    const verificationCode = generateVerificationCode();
    // const jwtToken = generateJwtToken(/* your user ID or additional data */);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_SENDER,
            pass: EMAIL_SENDER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'Verification Code and JWT Token',
        text: `Your verification code is: ${verificationCode}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

app.use(bodyParser.json());

app.post('/send-verification-code', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    sendVerificationCodeAndJwtByEmail(email)
        .then(() => {
            res.status(200).json({ success: true, message: 'Verification code and JWT sent successfully' });
        })
        .catch((error) => {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});
