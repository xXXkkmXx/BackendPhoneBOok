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
    name:String,
    number:{
      type: String,
      validate: {
        length:8,
        validator: (v)=>{
          return /\d{2}-\d{6}||\d{3}-\d{5}/.test(v);
        },
        message: props => `The number ${props.value} isn't valid`
      },

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