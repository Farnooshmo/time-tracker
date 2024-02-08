const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING * ',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );
    res.json({ message: 'Todo was updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a todo start time
app.put('/todos/:id/start', async (req, res) => {
  try {
    const { id } = req.params;
    const startTime = new Date(); // Get current time
    await pool.query('UPDATE todo SET start_time = $1 WHERE todo_id = $2', [startTime, id]);
    res.json({ message: 'Todo started', startTime: startTime });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update end time and calculate duration for a todo item
app.put('/todos/:id/end', async (req, res) => {
  try {
    const { id } = req.params;
    const endTime = new Date(); // Get current time

    // Get the start time from the database
    const startTimeQuery = await pool.query('SELECT start_time FROM todo WHERE todo_id = $1', [id]);
    const startTime = startTimeQuery.rows[0].start_time;

    // Calculate the duration using PostgreSQL's date and time functions
    const durationQuery = await pool.query(
      'SELECT $1::timestamp - $2::timestamp AS duration',
      [endTime, startTime]
    );
    const durationInSeconds = durationQuery.rows[0].duration;

    // Update the end time and duration columns in the database for the specified todo item
    await pool.query(
      'UPDATE todo SET end_time = $1, duration = $2 WHERE todo_id = $3',
      [endTime, durationInSeconds, id]
    );

    res.json({ message: 'Todo ended', endTime: endTime, duration: durationInSeconds });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

    // Check if any rows were affected, indicating a successful deletion
    if (deleteTodo.rowCount === 1) {
      res.json({ message: 'Todo was deleted!' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5001, () => {
  console.log('server has started on port 5001');
});
