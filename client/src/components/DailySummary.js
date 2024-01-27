import React from 'react'
import '../App.css'
import Logo from '../assets/sort-ascending.svg'

const DailySummary = () => {
	// Variable for today's activity timing will be added here
	const allTodayActivity = '4 h 22 m'

	return (
		<div className='daily-summary'>
			<img src={Logo} alt='Logo' className='logo' />
			<p>Today:</p>
			<h3>{allTodayActivity}</h3>
		</div>
	)
}

export default DailySummary
