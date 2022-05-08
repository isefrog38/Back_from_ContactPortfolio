const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 8080;
const smtpLogin = process.env.LOGIN || 'isefroge38@gmail.com';
const smtpPassword = process.env.PASSWORD || '799680pavel';
const cors = require('cors');
const smtpTransport = require('nodemailer-smtp-transport');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: smtpLogin,
        pass: smtpPassword
    }
}));


app.get('/', function (req, res) {
    res.send('main page');
});

app.post('/sendMessage', async function (req, res) {

    let {contactForm} = req.body;
    let {name, comment, email, numberPhone} = contactForm;
    console.log(req.body)

    let info = await transporter.sendMail({
        from: `${email}`,
        to: "isefroge38@gmail.com",
        subject: "HR CALL ME",
        html: `<b>Pashka !</b>
        Message from your Portfolio!
        <p/>
        <div>Name: ${name}</div>
        <div>Email: ${email}</div>
        <div>Number Phone: ${numberPhone}</div>
        <div>Text Message: ${comment}</div>
             `,
    });

    res.send("ok");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})