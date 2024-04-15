const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
const allowedOrigins = [
    'https://time-tracker-team.vercel.app',
    'http://localhost:3000' // Assuming your localhost runs on port 3000
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

// Create Todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body; // Extract description from the request body
        const date = new Date().toISOString().split('T')[0]; // Extract current date and format it as YYYY-MM-DD

        const newTodo = await pool.query(
            'INSERT INTO todo (description, date) VALUES ($1, $2) RETURNING *',
            [description, date]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get All Todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Todo
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

// Update Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );

        res.json('Todo was updated!');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start Todo
app.put('/todos/:id/start', async (req, res) => {
    try {
        const { id } = req.params;
        const start_time = new Date(); // Get the current timestamp

        const updateStart = await pool.query(
            'UPDATE todo SET start_time = $1 WHERE todo_id = $2',
            [start_time, id]
        );

        res.json({ message: 'Started todo', start_time });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// End Todo
app.put('/todos/:id/end', async (req, res) => {
    try {
        const { id } = req.params;

        const updateEnd = await pool.query(
            'UPDATE todo SET end_time = CURRENT_TIMESTAMP WHERE todo_id = $1',
            [id]
        );

        await updateTotalTime(id); // Update total time after setting end time
        await updateTodayActivity(); // Update today's activity

        res.json({ message: 'Ended todo' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Function to update total time
const updateTotalTime = async (todoId) => {
    try {
        const { rows } = await pool.query(
            'SELECT EXTRACT(EPOCH FROM (end_time - start_time)) AS duration FROM todo WHERE todo_id = $1',
            [todoId]
        );

        const durationInSeconds = Math.floor(rows[0].duration) || 0; // Convert duration to integer

        await pool.query('BEGIN'); // Start transaction

        // Update total time in seconds
        await pool.query(
            'UPDATE todo SET total_time = COALESCE(total_time, 0) + $1 WHERE todo_id = $2',
            [durationInSeconds, todoId]
        );

        await pool.query('COMMIT'); // Commit transaction

        console.log('Total time updated successfully');
    } catch (err) {
        await pool.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error updating total time: ', err.message);
    }
};

// Function to update today's activity
const updateTodayActivity = async () => {
    try {
        const { rows } = await pool.query(
            'SELECT COALESCE(SUM(total_time), 0) AS today_activity FROM todo WHERE date = CURRENT_DATE'
        );

        const todayActivity = Math.floor(rows[0].today_activity) || 0; 

        await pool.query(
            'UPDATE todo SET today_activity = $1 WHERE date = CURRENT_DATE',
            [todayActivity]
        );

        console.log('Today\'s activity updated successfully');
    } catch (err) {
        console.error('Error updating today\'s activity: ', err.message);
    }
};
// New route handler to fetch total weekly time
app.get('/total-weekly-time', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT COALESCE(SUM(total_time), 0) AS total_weekly_time FROM todo WHERE date >= CURRENT_DATE - INTERVAL \'6 days\''
        );

        const { total_weekly_time } = rows[0];
        res.json({ totalWeeklyTime: total_weekly_time });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// New route handler to fetch total monthly time
app.get('/total-monthly-time', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT COALESCE(SUM(total_time), 0) AS total_monthly_time FROM todo WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM CURRENT_DATE)'
        );

        const { total_monthly_time } = rows[0];
        res.json({ totalMonthlyTime: total_monthly_time });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
            id,
        ]);

        if (deleteTodo.rowCount === 1) {
            res.json('Deleted the todo successfully!');
        } else {
            res.status(404).json('Todo not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start Server
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
