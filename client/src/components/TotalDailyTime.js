import React, { useState, useEffect } from 'react';

const TotalDailyTime = () => {
  const [totalDailyTime, setTotalDailyTime] = useState(null);

  useEffect(() => {
    // Fetch total daily time from the server
    const fetchTotalDailyTime = async () => {
      try {
        const response = await fetch('http://localhost:5001/total-daily-time');
        const data = await response.json();
        setTotalDailyTime(data.totalDailyTime);
      } catch (error) {
        console.error('Error fetching total daily time:', error.message);
      }
    };

    fetchTotalDailyTime(); // Call the function to fetch total daily time
  }, []);

  return (
    <div>
      <h3>Today's Activity</h3>
      {totalDailyTime !== null ? (
        <p>{`Total time for today: ${totalDailyTime} hours`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TotalDailyTime;
