const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES//

//create a todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING * ',
			[description]
		)
		res.json(newTodo.rows[0])
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

//get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo');
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

//delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    
    // Check if any rows were affected, indicating a successful deletion
    if (deleteTodo.rowCount === 1) {
      res.json({ message: "Todo was deleted!" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(5001, () => {
	console.log('server has started on port 5001')
})
