const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-email', (req, res) => {
    const { to, subject, body, smtpServer, smtpPort, encryption, authentication, fromAddress } = req.body;

    let transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: false,
        tls: {
            rejectUnauthorized: false 
        }
    });

    let mailOptions = {
        from: fromAddress,
        to: to,
        subject: subject,
        text: body,
        html: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.status(200).send('Email sent successfully');
    });
});

const port = 5500;
app.listen(port, () => {
    console.log(`Email sending server running on port ${port}`);
});


