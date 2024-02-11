// Imports
// const express = require('express')
// const app = express()
// const cors = require('cors')

// const pool = require('./db')

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Create Todo
// app.post('/todos', async (req, res) => {
// 	try {
// 		const { description } = req.body
// 		const newTodo = await pool.query(
// 			'INSERT INTO todo (description) VALUES($1) RETURNING *',
// 			[description]
// 		)

// 		res.json(newTodo.rows[0])
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).send('Server Error')
// 	}
// })

// // Get All Todos
// app.get('/todos', async (req, res) => {
// 	try {
// 		const allTodos = await pool.query('SELECT * FROM todo')
// 		res.json(allTodos.rows)
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).send('Server Error')
// 	}
// })

// // Get Todo
// app.get('/todos/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])

// 		res.json(todo.rows[0])
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).send('Server Error')
// 	}
// })

// // Update Todo
// app.put('/todos/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const { description } = req.body

// 		const updateTodo = await pool.query(
// 			'UPDATE todo SET description = $1 WHERE todo_id = $2',
// 			[description, id]
// 		)

// 		res.json('Todo was updated!')
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).json({ error: 'Server error' })
// 	}
// })

// // Start Todo
// app.put('/todos/:id/start', async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const start_time = new Date()

// 		const updateStart = await pool.query(
// 			'UPDATE todo SET start_time = $1 WHERE todo_id = $2',
// 			[start_time, id]
// 		)

// 		res.json({ message: 'Started todo', start_time })
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).json({ error: 'Server error' })
// 	}
// })

// // End Todo
// app.put('/todos/:id/end', async (req, res) => {
// 	try {
// 		const { id } = req.params

// 		const updateEnd = await pool.query(
// 			'UPDATE todo SET end_time = CURRENT_TIMESTAMP WHERE todo_id = $1',
// 			[id]
// 		)

// 		await updateTotalTime(id) // Update total time after setting end time

// 		res.json({ message: 'Ended todo' })
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).json({ error: 'Server error' })
// 	}
// })

// // Update Total Time
// const updateTotalTime = async (todoId) => {
// 	try {
// 		const { rows } = await pool.query(
// 			'SELECT EXTRACT(EPOCH FROM (end_time - start_time)) AS duration FROM todo WHERE todo_id = $1',
// 			[todoId]
// 		)

// 		const durationInSeconds = rows[0].duration // Extract duration in seconds

// 		const prevTotalResult = await pool.query(
// 			'SELECT total_time FROM todo WHERE todo_id = $1',
// 			[todoId]
// 		)

// 		let { total_time } = prevTotalResult.rows[0]
// 		total_time = Number(total_time) || 0

// 		const updatedTotalTime = total_time + durationInSeconds

// 		await pool.query('UPDATE todo SET total_time = $1 WHERE todo_id = $2', [
// 			updatedTotalTime,
// 			todoId,
// 		])
// 	} catch (err) {
// 		console.error('Error updating total time: ', err.message)
// 	}
// }

// // Delete Todo
// app.delete('/todos/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params
// 		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
// 			id,
// 		])

// 		if (deleteTodo.rowCount === 1) {
// 			res.json('Deleted the todo successfully!')
// 		} else {
// 			res.status(404).json('Todo not found')
// 		}
// 	} catch (err) {
// 		console.error(err.message)
// 		res.status(500).json({ error: 'Server error' })
// 	}
// })

// // Start Server
// app.listen(5001, () => {
// 	console.log('Server started on port 5001')
// })






// const express = require('express');
// const app = express();
// const cors = require('cors');
// const pool = require('./db');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Create Todo
// app.post('/todos', async (req, res) => {
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             'INSERT INTO todo (description) VALUES($1) RETURNING *',
//             [description]
//         );
//         res.json(newTodo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get All Todos
// app.get('/todos', async (req, res) => {
//     try {
//         const allTodos = await pool.query('SELECT * FROM todo');
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get Todo
// app.get('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
//         res.json(todo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Update Todo
// app.put('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updateTodo = await pool.query(
//             'UPDATE todo SET description = $1 WHERE todo_id = $2',
//             [description, id]
//         );
//         res.json('Todo was updated!');
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // Start Todo
// app.put('/todos/:id/start', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const start_time = new Date();
//         const updateStart = await pool.query(
//             'UPDATE todo SET start_time = $1 WHERE todo_id = $2',
//             [start_time, id]
//         );
//         res.json({ message: 'Started todo', start_time });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // End Todo
// app.put('/todos/:id/end', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateEnd = await pool.query(
//             'UPDATE todo SET end_time = CURRENT_TIMESTAMP WHERE todo_id = $1',
//             [id]
//         );
//         await updateTotalTime(id); // Update total time after setting end time
//         res.json({ message: 'Ended todo' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // Update Total Time
// const updateTotalTime = async (todoId) => {
//     try {
//         const { rows } = await pool.query(
//             'SELECT EXTRACT(EPOCH FROM (end_time - start_time)) AS duration, end_time FROM todo WHERE todo_id = $1',
//             [todoId]
//         );

//         const { duration, end_time } = rows[0];
//         const durationInSeconds = duration || 0; // Extract duration in seconds

//         // Check if end time falls within the current day
//         const endDateTime = new Date(end_time);
//         const currentDateTime = new Date();
//         const isEndWithinCurrentDay =
//             endDateTime.getFullYear() === currentDateTime.getFullYear() &&
//             endDateTime.getMonth() === currentDateTime.getMonth() &&
//             endDateTime.getDate() === currentDateTime.getDate();

//         let updatedTotalTime = 0;

//         if (isEndWithinCurrentDay) {
//             // End time falls within the current day, update total time
//             const prevTotalResult = await pool.query(
//                 'SELECT total_time FROM todo WHERE todo_id = $1',
//                 [todoId]
//             );
//             let { total_time } = prevTotalResult.rows[0];
//             total_time = Number(total_time) || 0;

//             updatedTotalTime = total_time + durationInSeconds;
//         }

//         // Reset total time to 0 if end time is not within the current day
//         await pool.query('UPDATE todo SET total_time = $1 WHERE todo_id = $2', [
//             updatedTotalTime,
//             todoId,
//         ]);
//     } catch (err) {
//         console.error('Error updating total time: ', err.message);
//     }
// };


// // Delete Todo
// app.delete('/todos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
//             id,
//         ]);
//         if (deleteTodo.rowCount === 1) {
//             res.json('Deleted the todo successfully!');
//         } else {
//             res.status(404).json('Todo not found');
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // Start Server
// app.listen(5001, () => {
//     console.log('Server started on port 5001');
// });






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
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *',
            [description]
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

// Start Server
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
