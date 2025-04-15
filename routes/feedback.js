const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST: Submit Feedback
router.post('/', async (req, res) => {
    try {
      const { name, email, message, rating } = req.body;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
      }
  
      const newFeedback = new Feedback({ name, email, message, rating });
      await newFeedback.save();
  
      res.status(201).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit feedback.' });
    }
  });

// GET: Retrieve all Feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve feedback.' });
  }
});

module.exports = router;
