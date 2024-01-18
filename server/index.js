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
		const allTodos = await pool.query('SELECT * FROM todo')
		res.json(allTodos.rows)
	} catch (err) {
		console.error(err.message)
	}
})

//get a todo

//update a todo

//delete a todo

app.listen(5001, () => {
	console.log('server has started on port 5001')
})
