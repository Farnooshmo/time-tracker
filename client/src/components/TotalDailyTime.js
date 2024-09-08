// import React, { useState, useEffect } from 'react';

// const TotalDailyTime = () => {
//     const [totalDailyTime, setTotalDailyTime] = useState(null);

//     useEffect(() => {
//         const fetchTotalDailyTime = async () => {
//             try {
//                 const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
//                 const response = await fetch(`http://localhost:5001/todos?date=${currentDate}`);
//                 const data = await response.json();
//                 let total = 0;
//                 data.forEach(todo => {
//                     total += todo.total_time || 0; // Add total_time for each todo (if available)
//                 });
//                 setTotalDailyTime(total);
//             } catch (error) {
//                 console.error('Error fetching total daily time:', error.message);
//             }
//         };

//         fetchTotalDailyTime();
//     }, []);

//     const formatTime = (timeInSeconds) => {
//         const hours = Math.floor(timeInSeconds / 3600);
//         const minutes = Math.floor((timeInSeconds % 3600) / 60);
//         const seconds = timeInSeconds % 60;
//         return `${hours}h ${minutes}m ${seconds}s`;
//     };

//     return (
//         <div>
//             <h4>Today activity</h4>
            
//             {totalDailyTime !== null ? (
//                 <p>{formatTime(totalDailyTime)}</p>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default TotalDailyTime;
