import InputTodo from './InputTodo'
import StartTimer from './StartTimer'
import StopTimer from './StopTimer'

const Inprogress = () => {
	const inProgressDuration = '01:12:45'
	return (
		<div className='in-progress'>
			<InputTodo />
			<div className='in-progress-duration'>
				<p>In Progress:</p>
				<h4>{inProgressDuration}</h4>
			</div>
			<div className='in-progress-timing'>
				<p>Time Tracker</p>
				<StartTimer />
				<StopTimer />
			</div>
		</div>
	)
}

export default Inprogress
