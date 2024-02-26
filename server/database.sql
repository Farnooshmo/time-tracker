
CREATE DATABASE perntodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
);
ALTER TABLE todo
ADD COLUMN duration INTERVAL;
ALTER TABLE todo
ADD COLUMN total_time interval;



//totalDailyTime:

CREATE TABLE TotalDailyTime (
    id SERIAL PRIMARY KEY,
    todo_date DATE REFERENCES todo(date) ON DELETE CASCADE, //todo_date is foreign key (date) from todo table.
    daily_total_time INTERVAL
);

--  id | todo_date | daily_total_time 
-- ----+-----------+------------
-- (0 rows)
 ALTER TABLE TotalDailyTime
 ALTER COLUMN daily_total_time TYPE INTEGER USING EXTRACT(EPOCH FROM daily_total_time);
ADD
 id | todo_date | daily_total_time | todo_id 
----+-----------+------------------+---------
(0 rows)

//totalWeelyTime:

CREATE TABLE TotalWeeklyTime (
    id SERIAL PRIMARY KEY,
    daily_total_time_id INT REFERENCES TotalDailyTime(id) ON DELETE CASCADE,
    week_start_date DATE,
    week_end_date DATE,
    weekly_total_time INTERVAL
);


id | daily_total_time_id | week_start_date | week_end_date | weekly_total_time 
----+---------------------+-----------------+---------------+-----------------
(0 rows)



//totalMonthlyTime:

CREATE TABLE TotalMonthlyTime (
    id SERIAL PRIMARY KEY,
    total_weekly_time_id INT REFERENCES TotalWeeklyTime(id) ON DELETE CASCADE,
    month INT,
    year INT,
    monthly_total_time INTERVAL
);


 id | total_weekly_time_id | month | year | monthly_total_time 
----+----------------------+-------+------+--------------------
(0 rows)

