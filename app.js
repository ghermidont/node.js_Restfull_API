const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser');
// we import the router
const router = require('./routes/index.js');
// Set up the express app
const app = express();

//imported router is a middleware and to use it we have to use app.use(middleware_name);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

const PORT = 5000;

//creates a webserver for us. the 1st param is the port our app listens to. the 2nd is optional and runs when the server is created. After the server is created we can access our endpoint localhost:5000/api/v1/todos
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});