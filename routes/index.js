const express = require('express');
const db = require('../db/db');
const todoController = require('../todosControllers/todos');

//create a route handler
const router = express.Router();

router.get('/api/v1/todos', todoController.getAllTodos);
router.get('/api/v1/todos/:id', todoController.getTodo);
router.post('/api/v1/todos', todoController.createTodo);
router.put('/api/v1/todos/:id', todoController.updateTodo);
router.delete('/api/v1/todos/:id', todoController.deleteTodo);

module.exports = router;