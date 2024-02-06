import React from 'react'
import deleteIcon from '../assets/deleteIcon.svg'

const DeleteTodo = ({ todoId, onDelete }) => {
	const handleDelete = async () => {
		try {
			await fetch(`http://localhost:5001/todos/${todoId}`, {
				method: 'DELETE',
			})
			onDelete(todoId) // Update the state in the parent component after deletion
		} catch (err) {
			console.error(err.message)
		}
	}

	return (
		<img
			src={deleteIcon}
			alt='Delete'
			onClick={handleDelete}
			style={{ cursor: 'pointer' }}
		/>
	)
}

export default DeleteTodo
