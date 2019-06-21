import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

// get all todos
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

//create the endpoint (todo)
//in this request we do not make a request to the server to get data bu we pot data.
//we create a todo object with the information we got from the client through body-parser and then pus it to the dummy dbarray as a new todo.
app.post('/api/v1/todos', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
 const todo = {
   id: db.length + 1,
   title: req.body.title,
   description: req.body.description
 }
 db.push(todo);
 return res.status(201).send({
   success: 'true',
   message: 'todo added successfully',
   todo
 })
});

// Create a endpoint to get a single todo from the database.
//req.params is an object that contains all the parameters 
//passed to the routes, we convert the id to an int and then 
//we loop through our dummy database db to find the todo whose
//id will be equal to the one we got from the URL, the matching
//todo is then returned as the single todo.
app.get('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((todo) => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo,
      });
    } 
});
 return res.status(404).send({
   success: 'false',
   message: 'todo does not exist',
  });
});

//this is an endpoint to delete todos from the datbase.
app.delete('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
//search for it in the database, we did that by mapping 
//through the db array and check the id of the current todo
//in the iteration against the id we got from route till we
//find a match.
  db.map((todo, index) => {
    if (todo.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Todo deleted successfuly',
       });
    }
  });


    return res.status(404).send({
      success: 'false',
      message: 'todo not found',
    });
 
});
const PORT = 5000;

//creates a webserver for us. the 1st param is the port our app listens to. the 2nd is optional and runs when the server is created. After the server is created we can access our endpoint localhost:5000/api/v1/todos
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});