import React, { useState, useEffect } from 'react';

const TasksTotalTime = () => {
    const [tasksTotalTime, setTasksTotalTime] = useState(null);
    const [todaysDate, setTodaysDate] = useState(null);

    useEffect(() => {
        // Function to fetch total time for today's tasks from the server
        const fetchTasksTotalTime = async () => {
            try {
                const response = await fetch('http://localhost:5001/total-daily-time');
                const data = await response.json();
                setTasksTotalTime(data.totalDailyTime);

                // Set today's date for display
                const today = new Date();
                const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
                setTodaysDate(formattedDate);

                // Update today's activity in the database
                await fetch('http://localhost:5001/todos/today-activity', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ todayActivity: data.totalDailyTime }),
                });
            } catch (error) {
                console.error('Error fetching tasks total time:', error.message);
            }
        };

        fetchTasksTotalTime(); // Call the function to fetch total time for today's tasks
    }, []);

    return (
        <div>
            <h3>Today's Activity</h3>
            {tasksTotalTime !== null ? (
                <p>{`${todaysDate}: ${tasksTotalTime} hours`}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TasksTotalTime;
