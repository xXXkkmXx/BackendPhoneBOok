const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./model/Person');
const Mongo = require('./mongo.js');
const app = express();

const PORT = process.env.PORT

const errorHandler = (error,request,response,next) => {
  console.log(error.message);
  if(error.name == 'CastError'){
    return response.status(404).send({error:"malformatted"})
  }else if(error.name == 'ValidationError'){
    return response.status(400).json({error:error.message})
  }
  next(error)
}


app.use(errorHandler);
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(morgan((tkn,req,res)=>{
  return[
    tkn.method(req,res),
    tkn['url'](req,res),
    tkn.status(req,res),'-',
    tkn['response-time'](req,res), 'ms',
    '\x1b[00m'
  ].join(' ')
}))

app.get('/',(request,response)=>{
    response.send("<h1>Hello world</h1>");
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id;
  Person.findByIdAndDelete(id).catch(err=>{
    throw err;
  })
  response.status(204).end()
})

app.post('/api/persons/',(request,response,next)=>{
  const body = request.body;
  if(!body.name){
    return response.status(404).json({error: "content missing"});
  }
  
  const number = new Person({
    name: body.name,
    number: body.number
  })

  error = number.validateSync();
  
  if(!error){
    Person.insertOne(number).then(()=>{
    response.json(number)
    }).catch(err =>{
      next(err)
    }); 
  }else{
    return response.status(406).send({error:"wrong format of number"});
  }
});

app.patch('/api/persons/:id',(request,response)=>{
  const body = request.body;
  const id = request.params.id;
  Person.findByIdAndUpdate(id,{$set : body}).then(response.json(body));
});

app.get('/api/persons/:id',(request,response)=>{
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person);
    }else{
      response.status(404).end();
    }
  })
  .catch(error => {
    console.log("\x1b[31mERROR");
    response.json(400).send({error:'malformatted id'});
  })
})

app.get('/api/persons/',(request,response)=>{
  console.log(request.body.content);
  Person.find({}).then( person => {
    response.json(person);
  })
});

app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on port ${PORT}\x1b[00m`);
});