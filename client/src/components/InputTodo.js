import React, { Fragment, useState } from 'react'
import '../App.css'
import Logo from '../assets/squarePlus.svg'

const InputTodo = ({ onTodoAdded }) => { // Pass a callback function to handle todo addition
	const [description, setDescription] = useState('')

	// const onSubmitForm = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const body = { description }
	// 		const response = await fetch('http://localhost:5001/todos', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify(body),
	// 		})
	// 		const data = await response.json();
	// 		onTodoAdded(data); // Call the callback function to handle todo addition
	// 		setDescription(''); // Reset the input field after adding todo
	// 	} catch (err) {
	// 		console.error(err.message)
	// 	}
	// }



	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				description,
				date: new Date().toISOString().split('T')[0], // Extract date and format it as YYYY-MM-DD
			};
			const response = await fetch('http://localhost:5001/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await response.json();
			onTodoAdded(data); // Call the callback function to handle todo addition
			setDescription(''); // Reset the input field after adding todo
		} catch (err) {
			console.error(err.message);
		}
	};
	

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
					<img src={Logo} alt='Add Task' />
				</button>
			</form>
		</Fragment>
	)
}
export default InputTodo
