import React, { useState, useEffect } from 'react';

const TotalWeeklyTime = () => {
  const [totalWeeklyTime, setTotalWeeklyTime] = useState(null);

  useEffect(() => {
    // Fetch total weekly time from the server
    const fetchTotalWeeklyTime = async () => {
      try {
        const response = await fetch('http://localhost:5001/total-weekly-time');
        const data = await response.json();
        setTotalWeeklyTime(data.totalWeeklyTime);
      } catch (error) {
        console.error('Error fetching total weekly time:', error.message);
      }
    };

    fetchTotalWeeklyTime(); // Call the function to fetch total weekly time
  }, []);

  return (
    <div>
      <h3>Weekly Activity</h3>
      {totalWeeklyTime !== null ? (
        <p>{`Total time for this week: ${totalWeeklyTime} hours`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TotalWeeklyTime;

