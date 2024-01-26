import React, { Fragment } from 'react'
import './App.css'
import InputTodo from './components/InputTodo'
import Header from './components/Header'
import Footer from './components/Footer'
import SummaryActivities from './components/SummaryActivities.js'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<Header />
				<SummaryActivities />
				<InputTodo />
			</div>
			<Footer />
		</Fragment>
	)
}

export default App
