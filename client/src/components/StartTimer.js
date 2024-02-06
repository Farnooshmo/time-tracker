// StartTimer.js
import React, { useState, useEffect } from 'react';
import playerPlay from '../assets/playerPlay.svg';


const StartTimer = ({ todoId, onStart }) => {
 const [isTimerRunning, setTimerRunning] = useState(false);
 const [startTime, setStartTime] = useState(null);
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
   onStart(); // Add this line to trigger the passed onStart callback
     console.log('Start button clicked'); // Add this line for debugging
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


   return () => {
     clearInterval(intervalId);
   };
 }, [isTimerRunning, startTime]);


 return (
   <div>
     <img
       src={playerPlay}
       alt='Player Logo'
       onClick={handleStart}
       style={{ cursor: 'pointer' }}
     />
     {isTimerRunning && <span>{`Tracking: ${formatTime(elapsedTime)}`}</span>}
   </div>
 );
};


export default StartTimer;
