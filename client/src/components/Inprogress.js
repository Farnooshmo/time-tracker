import InputTodo from './InputTodo'
import StartTimer from './StartTimer'
import StopTimer from './StopTimer'

const Inprogress = () => {
	const inProgressDuration = '01:12:45'
	return (
		<div className='in-progress'>
			<div className='in-progress-duration'>
				<p>in progress:</p>
				<h3>{inProgressDuration}</h3>
			</div>
			<div className='in-progress-timing'>
				<p>Time tracker</p>
				<StartTimer />
				<StopTimer />
			</div>
			<InputTodo />
		</div>
	)
}

export default Inprogress
