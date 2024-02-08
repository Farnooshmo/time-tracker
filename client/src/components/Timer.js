import React, { useState, useEffect } from 'react';
import playerPlay from '../assets/playerPlay.svg';
import playStop from '../assets/playerStop.svg';

const Timer = ({ todoId }) => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimerRunning(true);
    setStartTime(new Date());
  };

  const handleStop = () => {
    setTimerRunning(false);
    setEndTime(new Date());
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, startTime]);

  useEffect(() => {
    // Store duration when timer stops
    if (!isTimerRunning && endTime) {
      const durationInSeconds = Math.floor((endTime - startTime) / 1000);
      // Send API request to store duration in backend
      fetch(`http://localhost:5001/todos/${todoId}/end`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ duration: durationInSeconds })
      })
        .then(response => response.json())
        .then(data => console.log(data)) // Log response from backend
        .catch(error => console.error('Error:', error));
    }
  }, [isTimerRunning, startTime, endTime, todoId]);

  return (
    <div>
      <img
        src={isTimerRunning ? playStop : playerPlay}
        alt={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
        onClick={isTimerRunning ? handleStop : handleStart}
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
