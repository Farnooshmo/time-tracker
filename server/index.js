const express = require('express');
const app = express();
const cors = require('cors');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('./api/db');

app.use(cors());
app.use(express.json());

// Create Todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await createTodo(description);
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get All Todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await getTodos();
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updated = await updateTodo(id, description);
    if (updated) {
      res.json('Todo updated successfully');
    } else {
      res.status(404).json('Todo not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteTodo(id);
    if (deleted) {
      res.json('Deleted the todo successfully!');
    } else {
      res.status(404).json('Todo not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
