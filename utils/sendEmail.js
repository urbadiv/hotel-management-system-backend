// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dineth.info2002@gmail.com',
            pass: 'Dineth@2002',
        },
    });

    const mailOptions = {
        from: 'dineth.info2002@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
