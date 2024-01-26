import React from 'react'
import '../App.css'

const SummaryActivities = () => {
	return (
		<div className='summary-box'>
			<div className='daily-activity-section'>
				<p>Today's Activity:</p>
				<h3>4 h 22 m</h3>
				{/* Add the calculation for daily activity here */}
			</div>

			<div className='weekly-activity-section'>
				<p>Weekly Activity:</p>
				<h3>17 h 27 m</h3>
				{/* Add the calculation for weekly activity here */}
			</div>
		</div>
	)
}

export default SummaryActivities
