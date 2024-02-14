import React, { useState, useEffect } from 'react';

const TotalMonthlyTime = () => {
  const [totalMonthlyTime, setTotalMonthlyTime] = useState(null);

  useEffect(() => {
    // Fetch total monthly time from the server
    const fetchTotalMonthlyTime = async () => {
      try {
        const response = await fetch('http://localhost:5001/total-monthly-time');
        const data = await response.json();
        setTotalMonthlyTime(data.totalMonthlyTime);
      } catch (error) {
        console.error('Error fetching total monthly time:', error.message);
      }
    };

    fetchTotalMonthlyTime(); // Call the function to fetch total monthly time
  }, []);

  return (
    <div>
      <h3>Monthly Activity</h3>
      {totalMonthlyTime !== null ? (
        <p>{`Total time for this month: ${totalMonthlyTime} hours`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TotalMonthlyTime;

