import React, { useState, useEffect } from 'react';

const TotalMonthlyTime = () => {
  const [totalMonthlyTime, setTotalMonthlyTime] = useState(null);

  useEffect(() => {
    const fetchTotalMonthlyTime = async () => {
      try {
        const daysOfMonth = []; // Array to store total daily time for each day in the month
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JavaScript months are 0-based, so January is 0, February is 1, etc.

        // Get the number of days in the current month
        const daysInMonth = new Date(year, month, 0).getDate();

        // Fetch total daily time for each day in the month
        for (let i = 1; i <= daysInMonth; i++) {
          const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
          const response = await fetch(`http://localhost:5001/todos?date=${formattedDate}`);
          const data = await response.json();
          let total = 0;
          data.forEach(todo => {
            total += todo.total_time || 0; // Add total_time for each todo (if available)
          });
          daysOfMonth.push(total); // Push total daily time to daysOfMonth array
        }

        // Calculate total monthly time by summing up total daily time for each day in the month
        const monthlyTotalTime = daysOfMonth.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalMonthlyTime(monthlyTotalTime);
      } catch (error) {
        console.error('Error fetching total monthly time:', error.message);
      }
    };

    fetchTotalMonthlyTime(); // Call the function to fetch total monthly time
  }, []);

  // Function to format time
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h3>Monthly Activity</h3>
      {totalMonthlyTime !== null ? (
        <p>{`Total time for this month: ${formatTime(totalMonthlyTime)} `}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TotalMonthlyTime;
