const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact');

// Create a new contact submission
router.post('/submit', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create new contact document
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save to database
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form',
            error: error.message
        });
    }
});

// Get all contact submissions (protected route for admin)
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: error.message
        });
    }
});

module.exports = router;
