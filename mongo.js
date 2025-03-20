const mongoose = require('mongoose');
const passowrd = process.argv[2];

const URL = `mongodb+srv://jamax382:${passowrd}@fullstackproject.4xxwf.mongodb.net/peoplesNumbers?retryWrites=true&w=majority&appName=FullstackProject`;  

mongoose.set('strictQuery',false);
mongoose.connect(URL);

const personSchema = new mongoose.Schema({
    id:Intl,
    name:String,
    number:String,
})
  
const Person = mongoose.model('Person',personSchema);

if(process.argv.length > 3){
    const name = process.argv[3];
    const number = process.argv[4];
    
    const person = new Person({
        id:2,
        name:name,
        number:number,
    })
    
    person.save().then(result => {
        console.log("added new number");
    })
    mongoose.connection.close();
}else{
    Person.find({}).then(result=>{
        result.forEach(person=>{
        console.log(person);    
      });
    })
    mongoose.connection.close();
}
