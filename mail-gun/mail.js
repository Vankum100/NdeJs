
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY ||  '7889c453cc002cdd97d1236f8af64740-360a0b2c-5ffae42b', 
        domain: process.env.DOMAIN || 'sandbox6b07e03ab91a4539ad9bcc64ec50de60.mailgun.org' 
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: 'kumkarana04@gmail.com', // T replace this with your own email
        to: email, // the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
};
module.exports = sendMail;
