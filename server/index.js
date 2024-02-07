const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update a todo by ID
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

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    if (deleteTodo.rowCount === 1) {
      res.json({ message: 'Todo was deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new time tracking entry with start_time
app.post('/time_tracking', async (req, res) => {
  try {
    const { todo_id, start_time } = req.body;
    const newTimeTrackingEntry = await pool.query(
      'INSERT INTO time_tracking (todo_id, start_time) VALUES ($1, $2) RETURNING *',
      [todo_id, start_time]
    );
    res.json(newTimeTrackingEntry.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update an existing time tracking entry with end time and calculate duration
app.put('/time_tracking/:tracking_id', async (req, res) => {
  try {
    const { tracking_id } = req.params;
    const { end_time } = req.body;

    // Update end_time and calculate duration
    const updateTimeTrackingEntry = await pool.query(
      'UPDATE time_tracking SET end_time = $1, duration = EXTRACT(EPOCH FROM $1) - EXTRACT(EPOCH FROM start_time) WHERE tracking_id = $2 RETURNING *',
      [end_time, tracking_id]
    );

    // Calculate total_time spent on the corresponding task and update the todo table
    const todoIdQuery = await pool.query('SELECT todo_id FROM time_tracking WHERE tracking_id = $1', [tracking_id]);
    const todoId = todoIdQuery.rows[0].todo_id;
    const totalTimeQuery = await pool.query(
      'SELECT SUM(duration) AS total_duration FROM time_tracking WHERE todo_id = $1',
      [todoId]
    );
    const totalTime = totalTimeQuery.rows[0].total_duration;

    // Update total_time in the todo table
    await pool.query('UPDATE todo SET total_time = $1 WHERE todo_id = $2', [totalTime, todoId]);

    res.json(updateTimeTrackingEntry.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
