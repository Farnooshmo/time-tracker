import React, { Fragment, useEffect, useState } from 'react'
import '../App.css'
import InputTodo from './InputTodo' // Import InputTodo component
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'
import Timer from './Timer'

const ListTodos = () => {
	const totalTime = '60 min'
	const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5001/todos')
			const jsonData = await response.json()
			setTodos(jsonData)
		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	console.log(todos)

	const deleteTodo = (deletedTodoId) => {
		setTodos(todos.filter((todo) => todo.todo_id !== deletedTodoId))
	}

	const addTodo = (newTodo) => {
		setTodos([...todos, newTodo]) // Add the new todo to the list
	}

	return (
		<Fragment>
			<InputTodo onTodoAdded={addTodo} /> Pass the addTodo function to InputTodo
			<div className='list-todos'>
				{todos &&
					todos.map((todo) => (
						<div key={todo.todo_id} className='todo-item'>
							<div className='todo-description'>{todo.description}</div>
							<div className='todo-actions'>
								<div className='todo-total-time'>
									<p>{totalTime}</p>
								</div>
								<div className='todo-timer'>
									<Timer todoId={todo.todo_id} />
								</div>
								<div className='todo-edit-delet'>
									<EditTodo todo={todo} />
									<DeleteTodo todoId={todo.todo_id} onDelete={deleteTodo} />
								</div>
							</div>
						</div>
					))}
			</div>
		</Fragment>
	)
}

export default ListTodos
