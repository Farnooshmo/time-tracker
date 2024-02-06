// import React from "react";
// import playStop from "../assets/playerStop.svg";

// const StopTimer = () => {
//   return <div>
//     <img src= { playStop } alt= "Stop logo" className=""/>
//   </div>;
// };

// export default StopTimer;



// StopTimer.js
// import React, { useState, useEffect } from 'react';
// import playStop from '../assets/playerStop.svg';

// const StopTimer = () => {
//   const [isTimerRunning, setTimerRunning] = useState(false);
//   const [stopTime, setStopTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const handleStop = () => {
//     if (isTimerRunning) {
//       setTimerRunning(false);
//       setStopTime(new Date());
//     }
//   };

//   useEffect(() => {
//     let intervalId;

//     if (isTimerRunning) {
//       intervalId = setInterval(() => {
//         const currentTime = new Date();
//         const elapsedSeconds = Math.floor((currentTime - stopTime) / 1000);
//         setElapsedTime(elapsedSeconds);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [isTimerRunning, stopTime]);

//   return (
//     <div>
//       <img
//         src={playStop}
//         alt='Stop Logo'
//         onClick={handleStop}
//         style={{ cursor: 'pointer' }}
//       />
//       {isTimerRunning && <span>{`Timer Running: ${formatTime(elapsedTime)}`}</span>}
//     </div>
//   );
// };

// export default StopTimer;





// StopTimer.js
// import React, { useState, useEffect } from 'react';
// import playStop from '../assets/playerStop.svg';

// const StopTimer = ({ todoId, onStop }) => {
//   const [isTimerRunning, setTimerRunning] = useState(false);
//   const [stopTime, setStopTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const handleStop = () => {
//     if (isTimerRunning) {
//       setTimerRunning(false);
//       setStopTime(new Date());
//       onStop(); // Add this line to trigger the passed onStop callback and Notify the parent component about the stop event
//       console.log('Stop button clicked'); // Add this line for debugging
//     }
//   };

//   useEffect(() => {
//     let intervalId;

//     if (isTimerRunning) {
//       intervalId = setInterval(() => {
//         const currentTime = new Date();
//         const elapsedSeconds = Math.floor((currentTime - stopTime) / 1000);
//         setElapsedTime(elapsedSeconds);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [isTimerRunning, stopTime]);

//   return (
//     <div>
//       <img
//         src={playStop}
//         alt='Stop Logo'
//         onClick={handleStop}
//         style={{ cursor: 'pointer' }}
//       />
//       {isTimerRunning && <span>{`Timer Running: ${formatTime(elapsedTime)}`}</span>}
//     </div>
//   );
// };

// export default StopTimer;






// StopTimer.js
import React, { useState, useEffect } from 'react';
import playStop from '../assets/playerStop.svg';

const StopTimer = ({ todoId, onStop }) => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [stopTime, setStopTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStop = () => {
    if (isTimerRunning) {
      console.log('Before setting timer running to false');
      setTimerRunning(false);
      console.log('After setting timer running to false');
      setStopTime(new Date());
      console.log('Before calling onStop callback');
      onStop(); // Add this line to trigger the passed onStop callback and Notify the parent component about the stop event
      console.log('After calling onStop callback');
      console.log('Stop button clicked'); // Add this line for debugging
    }
  };

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - stopTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning, stopTime]);

  return (
    <div>
      <img
        src={playStop}
        alt='Stop Logo'
        onClick={handleStop}
        style={{ cursor: 'pointer' }}
      />
      {isTimerRunning && <span>{`Timer Running: ${formatTime(elapsedTime)}`}</span>}
    </div>
  );
};

export default StopTimer;


