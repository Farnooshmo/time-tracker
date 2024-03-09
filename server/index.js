
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



// // Start Todo
// app.put('/todos/:id/start', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const start_time = new Date(); // Get the current timestamp
//         const date = start_time.toISOString().split('T')[0]; // Extract date from start_time

//         const updateStart = await pool.query(
//             'UPDATE todo SET start_time = $1, date = $2 WHERE todo_id = $3',
//             [start_time, date, id]
//         );

//         res.json({ message: 'Started todo', start_time });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });
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

        res.json({ message: 'Ended todo' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

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

        // Calculate daily total time
        const { rows: dailyTotalTimeRows } = await pool.query(
            'SELECT COALESCE(SUM(total_time), 0) AS daily_total_time FROM todo WHERE date = CURRENT_DATE'
        );
        const dailyTotalTime = dailyTotalTimeRows[0].daily_total_time || 0;

        // Update daily total time in totaldailytime table
        await pool.query(
            'UPDATE totaldailytime SET daily_total_time = $1 WHERE todo_date = CURRENT_DATE',
            [dailyTotalTime]
        );

        await pool.query('COMMIT'); // Commit transaction

        console.log('Total time and daily total time updated successfully');
    } catch (err) {
        await pool.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error updating total time and daily total time: ', err.message);
    }
};

    



// Reset Today_activity
setInterval(async () => {
    try {
        await pool.query('UPDATE todo SET today_activity = 0');
        console.log('Total time reset successfully');
    } catch (err) {
        console.error('Error resetting today_activity: ', err.message);
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


// Calculate and update total activity time for a specific day
// app.put('/calculate-todays-activity', async (req, res) => {
//     try {
//         const { date } = req.body; // Extract date from request body

//         // Validate date format
//         if (!isValidDate(date)) {
//             return res.status(400).json({ error: 'Invalid date format. Date should be in YYYY-MM-DD format.' });
//         }

//         // Retrieve tasks for the specified date from the database
//         const tasks = await pool.query('SELECT * FROM todo WHERE date = $1', [date]);

//         // Calculate total activity time for all tasks in seconds
//         let totalActivityTimeSeconds = 0;
//         tasks.rows.forEach(task => {
//             totalActivityTimeSeconds += task.total_time || 0; // Add total_time for each task (if available)
//         });

//         // Format total activity time in hours (optional)
//         const totalActivityTimeHours = totalActivityTimeSeconds / 3600;

//         // Update todays_activity column in todo table for the specified date
//         await pool.query('UPDATE todo SET todays_activity = $1 WHERE date = $2', [totalActivityTimeHours, date]);


//         res.json({ message: 'Total activity time calculated and updated successfully' });
//     } catch (error) {
//         console.error('Error calculating and updating total activity time:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // Validate date format (YYYY-MM-DD)
// function isValidDate(dateString) {
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     return regex.test(dateString);
// }


// Update today's activity
// app.put('/todos/today-activity', async (req, res) => {
//     try {
//         const { todayActivity } = req.body;

//         // Update today's activity in the database
//         await pool.query(
//             'UPDATE todo SET todays_activity = $1 WHERE date = CURRENT_DATE',
//             [todayActivity]
//         );

//         res.json({ message: 'Today\'s activity updated successfully' });
//     } catch (err) {
//         console.error('Error updating today\'s activity: ', err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// Start Server
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
