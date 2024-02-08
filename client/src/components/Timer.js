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
    if (!isTimerRunning) {
      setTimerRunning(true);
      setStartTime(new Date());
    }
  };

  const handleStop = () => {
    if (isTimerRunning) {
      setTimerRunning(false);
      setEndTime(new Date());
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

  // Calculate duration when the timer is stopped
  useEffect(() => {
    if (!isTimerRunning && endTime) {
      const durationInSeconds = Math.floor((endTime - startTime) / 1000);
      // Now you can handle the duration data as needed, you can log it or send it to the parent component
      console.log('Duration:', formatTime(durationInSeconds));
    }
  }, [isTimerRunning, startTime, endTime]);

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
