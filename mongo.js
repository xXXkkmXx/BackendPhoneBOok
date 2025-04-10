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


const personSchema = new mongoose.Schema({
    name:{
      type:String,
      minLength:3
    },
    number:{
      type: String,
      minLength: 8,
      require: true,
      validate:{
        validator: (v)=>{
          return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v)
        }
      }
    }
})
  
personSchema.set('toJSON',{
    transform : (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Person',personSchema);