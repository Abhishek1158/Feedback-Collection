const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const feedbackRoutes = require('./routes/feedback');
const bodyParser = require('body-parser');

dotenv.config();
const app=express();
app.use(bodyParser.json());


// Middlewares
app.use(express.json());
// Routes
app.use('/api/feedback', feedbackRoutes);

const port=process.env.PORT ||4001;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected with MongoDB');
    app.listen(port, () => {
      console.log('Server running on port 4001');
    });
})
.catch(err => console.log(err));
app.get("/user",async (req,res) => {
    
});

app.use(bodyParser.json());

let feedbacks = [];
let currentId = 1;
// POST /feedback → Submit feedback
app.post('/feedback', (req, res) => {
    const { name, rating, message } = req.body;
  
    if (!name || !message || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    const feedback = {
      id: currentId++,
      name,
      rating,
      message,
      timestamp: new Date().toISOString(),
    };
  
    feedbacks.push(feedback);
    res.status(201).json(feedback);
  });
  
  // GET /feedback → List all feedbacks
  app.get('/feedback', (req, res) => {
    res.json(feedbacks);
  });

// app.use(bodyParser.json());

// let feedbacks = [];
// let currentId = 1;
// // POST /feedback → Submit feedback
// app.post('/feedback', (req, res) => {
//     const { name, rating, message } = req.body;
  
//     if (!name || !message || typeof rating !== 'number') {
//       return res.status(400).json({ error: 'Invalid input' });
//     }
  
//     const feedback = {
//       id: currentId++,
//       name,
//       rating,
//       message,
//       timestamp: new Date().toISOString(),
//     };
  
//     feedbacks.push(feedback);
//     res.status(201).json(feedback);
//   });
  
//   // GET /feedback → List all feedbacks
//   app.get('/feedback', (req, res) => {
//     res.json(feedbacks);
//   });

