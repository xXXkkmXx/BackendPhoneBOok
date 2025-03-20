const mongoose = require('mongoose');
const passowrd = process.argv[2];
const URL = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);
mongoose.connect(URL)  
  .then(result => {
    console.log('\x1b[32m connected to MongoDB\x1b[00m');
  })
  .catch(error => {
    console.log('\x1b[31m error connecting to MongoDB\x1b[00m',error.message);
  });


const personSchema = new mongoose.Schema({
    id:Intl,
    name:String,
    number:String,
})
  
personSchema.set('toJSON',{
    transform : (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Person',personSchema);