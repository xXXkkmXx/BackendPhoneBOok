const mongoose = require('mongoose');
const URL = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);
mongoose.connect(URL)  
  .then(result => {
    console.log('\x1b[32m connected to MongoDB\x1b[00m');
  })
  .catch(error => {
    console.log('\x1b[31m error connecting to MongoDB\x1b[00m',error.message);
});