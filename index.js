const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

numbers = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.use(cors());
app.use(express.json());
app.use(morgan((tkn,req,res)=>{
  return[
    '\x1b[32m',
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
  const person = numbers.filter(person => person.id == id);
  response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
  const id = Math.floor(Math.random() * (100-numbers.length) + numbers.length);
  let name;
  let number;
  numbers.map((person) => {
    if(person.name == name){
      response.send("There's a person with that name").end();
    }else if(person.number == number){
      response.send("The number must be unique").end();
    }
  });
  const person = {
    "id":id,
    "name":"",
    "number":""
  }
  numbers += person;
  response.send(person);
})

app.get('/api/persons/:id',(request,response)=>{
  const id = request.params.id;
  const person = numbers.find(person => person.id == id);
  response.json(person)
})

app.get('/api/persons/',(request,response)=>{
    response.json(numbers)
});

app.get('/info',(request,response)=>{
    const body = request.body;
    let numberPeople = 0;
    numbers.map(item=>{
        numberPeople += 1
    })
    response.send(`<h2>Phonebook has info for ${numberPeople} people</h2><h3>${body.time}</h3>`)
});

app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on port ${PORT}\x1b[00m`);
});