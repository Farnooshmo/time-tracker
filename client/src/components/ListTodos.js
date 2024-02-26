// Import useState and useEffect
import React, { Fragment, useEffect, useState } from 'react'
import '../App.css'
import InputTodo from './InputTodo'
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'
import Timer from './Timer'

const ListTodos = () => {
	// Define state variables
	const [todos, setTodos] = useState([])

	// Function to fetch todos from the server
	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5001/todos')
			const jsonData = await response.json()
			setTodos(jsonData)
		} catch (err) {
			console.error(err.message)
		}
	}

	// useEffect hook to fetch todos when component mounts
	useEffect(() => {
		getTodos()
	}, [])

	// Function to delete a todo from the list
	const deleteTodo = (deletedTodoId) => {
		setTodos(todos.filter((todo) => todo.todo_id !== deletedTodoId))
	}

	// Function to add a new todo to the list
	const addTodo = (newTodo) => {
		setTodos([newTodo, ...todos])
	}

	return (
		<Fragment>
			{/* InputTodo component for adding new todos */}
			<InputTodo onTodoAdded={addTodo} />

			{/* Display list of todos */}
			<div className='list-todos'>
				{todos &&
					todos.map((todo) => (
						<div key={todo.todo_id} className='todo-item'>
							<div className='todo-description'>{todo.description}</div>
							<div className='todo-actions'>
								{/* Display total_time for each todo */}
								<div className='todo-total-time'>
									{/* Display total_time in hours and minutes */}
									<p>
    Total:{' '}
    {todo.total_time !== undefined
        ? `${Math.floor(todo.total_time / 3600)}h ${Math.floor((todo.total_time % 3600) / 60)}m ${todo.total_time % 60}s`
        : '0h 0m 0s'}
</p>


								</div>

								{/* Timer component */}
								<div className='todo-timer'>
									<Timer todoId={todo.todo_id} />
								</div>

								{/* EditTodo and DeleteTodo components */}
								<div className='todo-edit-delete'>
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
