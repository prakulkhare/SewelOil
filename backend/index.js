const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file
const productRoutes = require('./routes/productRoutes');  // Import product routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend to send requests
}));
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);  // Exit process with failure code
  }
};


connectDB();

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Use the GMAIL_USER from .env
    pass: process.env.GMAIL_APP_PASSWORD,  // Use the GMAIL_APP_PASSWORD from .env
  },
});

// POST endpoint to handle contact form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,  // user's email
    to: 'seweloilcom@gmail.com',  // destination email
    subject: `Contact Form Submission from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);  // Log detailed error info
      return res.status(500).json({ message: 'Error sending email', error: error.toString() });  // Send detailed error to frontend
    }
    console.log('Email sent:', info);
    res.status(200).json({ message: 'Email sent successfully' });  // Send success message
  });
});

// Use Product Routes
app.use('/api', productRoutes);  // Use the product routes for fetching products

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
