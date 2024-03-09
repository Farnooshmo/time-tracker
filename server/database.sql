
CREATE DATABASE perntodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
);
ALTER TABLE todo
ADD COLUMN duration INTEGER;
ALTER TABLE todo
ADD COLUMN total_time INTEGER;

ALTER TABLE todo
ADD COLUMN today_activity INTEGER;








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

