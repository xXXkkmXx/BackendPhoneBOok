const mongoose = require("mongoose");

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