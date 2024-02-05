import React from 'react'
import '../App.css'

const SummaryActivities = () => {
	return (
		<div className='summary-box'>
			<div className='daily-activity-section'>
				<p>Today's Activity:</p>
				<h4>4 h 22 m</h4>
				{/* Add the calculation for daily activity here */}
			</div>

			<div className='weekly-activity-section'>
				<p>Weekly Activity:</p>
				<h4>17 h 27 m</h4>
				{/* Add the calculation for weekly activity here */}
			</div>

			<div className='monthly-activity-section'>
				<p>Monthly Activity:</p>
				<h4>87 h 42 m</h4>
				{/* Add the calculation for weekly activity here */}
			</div>
		</div>
	)
}

export default SummaryActivities
