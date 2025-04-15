const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const User=require("./models/user")

dotenv.config();
const app=express();
// Middlewares
app.use(express.json());
const port=process.env.PORT ||4001;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected with MongoDB');
    app.listen(port, () => {
      console.log('Server running on port 4001');
    });
})
.catch(err => console.log(err));

// app.get('/',(req,res)=>{
//     res.send('Server Checking...');
// });
// const port=4001
// app.listen(port,()=>{
//     console.log("server started on port 4001");
// });
