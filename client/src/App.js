import React, { Fragment } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import SummaryActivities from './components/SummaryActivities.js'
import ListTodos from './components/ListTodos.js'
// import InputTodo from './components/InputTodo.js'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<Header />

				<main className='main-content'>
					<SummaryActivities />
					{/* <InputTodo /> */}
					<ListTodos />
				</main>

				<Footer />
			</div>
		</Fragment>
	)
}

export default App
