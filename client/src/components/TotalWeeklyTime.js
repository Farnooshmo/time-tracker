// import React, { useState, useEffect } from 'react';

// const TotalWeeklyTime = () => {
//   const [totalWeeklyTime, setTotalWeeklyTime] = useState(null);

//   useEffect(() => {
//     const fetchTotalWeeklyTime = async () => {
//       try {
//         const daysOfWeek = []; // Array to store total daily time for each day in the week
//         for (let i = 0; i < 7; i++) {
//           const date = new Date();
//           date.setDate(date.getDate() - i); // Subtract i days from the current date to get each day in the week
//           const formattedDate = date.toISOString().split('T')[0]; // Format the date
//           const response = await fetch(`http://localhost:5001/todos?date=${formattedDate}`);
//           const data = await response.json();
//           let total = 0;
//           data.forEach(todo => {
//             total += todo.total_time || 0; // Add total_time for each todo (if available)
//           });
//           daysOfWeek.push(total); // Push total daily time to daysOfWeek array
//         }
//         // Calculate total weekly time by summing up total daily time for each day in the week
//         const weeklyTotalTime = daysOfWeek.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         setTotalWeeklyTime(weeklyTotalTime);
//       } catch (error) {
//         console.error('Error fetching total weekly time:', error.message);
//       }
//     };

//     fetchTotalWeeklyTime(); // Call the function to fetch total weekly time
//   }, []);

//   // Function to format time
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <div>
//       <h4>Weekly activity</h4>
//       {totalWeeklyTime !== null ? (
//         <p>{formatTime(totalWeeklyTime)}</p>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default TotalWeeklyTime;
