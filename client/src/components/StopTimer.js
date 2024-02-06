import React, { useState } from 'react';
import playStop from '../assets/playerStop.svg';

const StopTimer = ({ onStop }) => {
  const [isTimerRunning, setTimerRunning] = useState(false);

  const handleStop = () => {
    console.log('Stop button clicked'); // Debugging statement

    // Update the timer running state
    setTimerRunning(false);

    // Trigger the stop callback
    onStop();
  };

  return (
    <div>
      <img
        src={playStop}
        alt='Stop Logo'
        onClick={handleStop}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default StopTimer;




