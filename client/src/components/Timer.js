import React, { useState, useEffect } from 'react';
import playerPlay from '../assets/playerPlay.svg';
import playStop from '../assets/playerStop.svg';

const Timer = ({ todoId }) => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = async () => {
    if (!isTimerRunning) {
      try {
        const response = await fetch(`http://localhost:5001/todos/${todoId}/start`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          setTimerRunning(true);
          setStartTime(new Date());
        } else {
          console.error('Failed to update start time');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleStop = () => {
    if (isTimerRunning) {
      setTimerRunning(false);
      const currentTime = new Date();
      setElapsedTime(Math.floor((currentTime - startTime) / 1000));
    }
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, startTime]);

  return (
    <div>
      <img
        src={playerPlay}
        alt='Start Timer'
        onClick={handleStart}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={playStop}
        alt='Stop Timer'
        onClick={handleStop}
        style={{ cursor: 'pointer' }}
      />
      {isTimerRunning ? (
        <span>{`Elapsed Time: ${formatTime(elapsedTime)}`}</span>
      ) : (
        elapsedTime > 0 && <span>{`Recorded Time: ${formatTime(elapsedTime)}`}</span>
      )}
    </div>
  );
};

export default Timer;
