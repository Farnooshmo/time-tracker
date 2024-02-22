
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Create Todo
app.post('/todos', async (req, res) => {
    try {
        const { description, date } = req.body; // Extract date from the request body
        const newTodo = await pool.query(
            'INSERT INTO todo (description, date) VALUES($1, $2) RETURNING *', // Include date in the INSERT query
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
        const start_time = new Date();
        const date = start_time.toISOString().split('T')[0]; // Extract date from start_time

        const updateStart = await pool.query(
            'UPDATE todo SET start_time = $1, date = $2 WHERE todo_id = $3',
            [start_time, date, id]
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

        res.json({ message: 'Ended todo' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Total Time
const updateTotalTime = async (todoId) => {
    try {
        const { rows } = await pool.query(
            'SELECT EXTRACT(EPOCH FROM (end_time - start_time)) AS duration FROM todo WHERE todo_id = $1',
            [todoId]
        );

        const durationInSeconds = rows[0].duration; // Extract duration in seconds

        const prevTotalResult = await pool.query(
            'SELECT total_time FROM todo WHERE todo_id = $1',
            [todoId]
        );

        let { total_time } = prevTotalResult.rows[0];
        total_time = Number(total_time) || 0;

        const updatedTotalTime = total_time + durationInSeconds;

        await pool.query('UPDATE todo SET total_time = $1 WHERE todo_id = $2', [
            updatedTotalTime,
            todoId,
        ]);
    } catch (err) {
        console.error('Error updating total time: ', err.message);
    }
};

// Reset Total Time Daily
setInterval(async () => {
    try {
        await pool.query('UPDATE todo SET total_time = 0');
        console.log('Total time reset successfully');
    } catch (err) {
        console.error('Error resetting total time: ', err.message);
    }
}, 24 * 60 * 60 * 1000); // Reset every 24 hours

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


// New route handler to fetch total daily time
app.get('/total-daily-time', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT COALESCE(SUM(daily_total_time), 0) AS total_daily_time FROM totaldailytime WHERE todo_date = CURRENT_DATE'
        );

        const { total_daily_time } = rows[0];
        res.json({ totalDailyTime: total_daily_time });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// New route handler to fetch total weekly time
app.get('/total-weekly-time', async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT COALESCE(SUM(weekly_total_time), 0) AS total_weekly_time FROM totalweeklytime WHERE week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE'
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
            'SELECT COALESCE(SUM(monthly_total_time), 0) AS total_monthly_time FROM totalmonthlytime WHERE month = EXTRACT(MONTH FROM CURRENT_DATE) AND year = EXTRACT(YEAR FROM CURRENT_DATE)'
        );

        const { total_monthly_time } = rows[0];
        res.json({ totalMonthlyTime: total_monthly_time });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});




// Start Server
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
