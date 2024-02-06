// import InputTodo from './InputTodo'
// import StartTimer from './StartTimer'
// import StopTimer from './StopTimer'

// const Inprogress = () => {
// 	const inProgressDuration = '01:12:45'
// 	return (
// 		<div className='in-progress'>
// 			<InputTodo />
// 			<div className='in-progress-duration'>
// 				<p>In Progress:</p>
// 				<h4>{inProgressDuration}</h4>
// 			</div>
// 			<div className='in-progress-timing'>
// 				<p>Time Tracker</p>
// 				<StartTimer />
// 				<StopTimer />
// 			</div>
// 		</div>
// 	)
// }

// export default Inprogress






// Inprogress.js
import React, { useState } from 'react';
import InputTodo from './InputTodo';
import StartTimer from './StartTimer';
import StopTimer from './StopTimer';

const Inprogress = () => {
  const [inProgressDuration, setInProgressDuration] = useState('00:00:00');

  const handleStart = () => {
    // Implement logic to handle the start event in the Inprogress component
    console.log('Start timer in Inprogress component');
  };

  const handleStop = () => {
    // Implement logic to handle the stop event in the Inprogress component
    console.log('Stop timer in Inprogress component');
  };

  return (
    <div className='in-progress'>
      <InputTodo />
      <div className='in-progress-duration'>
        <p>In Progress:</p>
        <h4>{inProgressDuration}</h4>
      </div>
      <div className='in-progress-timing'>
        <p>Time Tracker</p>
        <StartTimer onStart={handleStart} />
        <StopTimer onStop={handleStop} />
      </div>
    </div>
  );
};

export default Inprogress;
