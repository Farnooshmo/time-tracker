CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);


CREATE TABLE time_tracking (
    tracking_id SERIAL PRIMARY KEY,
    todo_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (todo_id) REFERENCES todo(todo_id)
);