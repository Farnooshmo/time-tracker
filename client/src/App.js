import React, { Fragment } from 'react'
import './App.css'
import InputTodo from './components/InputTodo'
import Header from './components/Header'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<Header />
				<InputTodo />
			</div>
		</Fragment>
	)
}

export default App
