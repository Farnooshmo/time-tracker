import React, { Fragment, useState } from 'react'
import '../App.css'
import Logo from '../assets/squarePlus.svg'

const InputTodo = () => {
	const [description, setDescription] = useState('')

	const onSubmitForm = async (e) => {
		e.preventDefault()
		try {
			const body = { description }
			const response = await fetch('http://localhost:5001/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			//   window.location = "/";
		} catch (err) {
			console.error(err.message)
		}
	}

	return (
		<Fragment>
			<form className='input-todo' onSubmit={onSubmitForm}>
				<input
					type='text'
					className='input-form-control'
					placeholder='Add a task...'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button type='submit' className='btn-input'>
					<img src={Logo} alt='Add Task' onClick={onSubmitForm} />
				</button>
			</form>
		</Fragment>
	)
}
export default InputTodo
