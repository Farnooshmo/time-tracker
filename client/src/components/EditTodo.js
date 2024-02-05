import React, { Fragment, useState } from 'react'
import editIcon from '../assets/editIcon.svg'
import saveIcon from '../assets/saveIcon.svg'

const EditTodo = ({ todo }) => {
	const [showModal, setShowModal] = useState(false)
	const [description, setDescription] = useState(todo.description)

	// Edit description function
	const updateDescription = async () => {
		try {
			const body = { description }
			const response = await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			if (!response.ok) {
				throw new Error('Failed to update todo')
			}
			closeModal()
			window.location = '/'
		} catch (err) {
			console.error(err.message)
		}
	}

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<Fragment>
			<img
				src={editIcon}
				alt='Edit'
				onClick={openModal}
				style={{ cursor: 'pointer' }}
			/>
			{showModal && (
				<div className='modal-overlay'>
					<div className='modal'>
						<span className='close' onClick={closeModal}>
							&times;
						</span>
						<div className='modal-content'>
							<input
								type='text'
								className='form'
								placeholder='Edit your todo here'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<img
								src={saveIcon}
								alt='Save'
								onClick={updateDescription}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default EditTodo
