import React, { useState, useEffect } from 'react';

const TaskCurrentTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      setCurrentDateTime(`Current time: ${formattedTime}, ${formattedDate}`);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return <p>{currentDateTime}</p>;
};

export default TaskCurrentTime;
