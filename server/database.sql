
CREATE DATABASE perntodo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    duration INTEGER,
    total_time INTEGER,
    today_activity INTEGER
);

