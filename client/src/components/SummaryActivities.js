import React from 'react'
import '../App.css';
import TotalDailyTime from './TotalDailyTime';
import TotalWeeklyTime from './TotalWeeklyTime';
import TotalMonthlyTime from './TotalMonthlyTime';
import TasksTotalTime from './TasksTotalTime';

const SummaryActivities = () => {
	return (
		<div className='summary-box'>
			<div className='daily-activity-section'>
				{/* <TotalDailyTime /> */}
				<TasksTotalTime />
			</div>

			<div className='weekly-activity-section'>
                <TotalWeeklyTime />
			</div>

			<div className='monthly-activity-section'>
				<TotalMonthlyTime />
			</div>
		</div>
	)
}

export default SummaryActivities
