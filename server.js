const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); // Import Nodemailer for email functionality
const bodyParser = require('body-parser'); // Middleware for parsing form data

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Email Sending Route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail address
            pass: 'your-email-password', // Replace with your Gmail App Password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'hafizmnazim022@gmail.com', // Replace with the recipient's email address
        subject: `New Query from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending message. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thank you for contacting us! Your message has been sent.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
