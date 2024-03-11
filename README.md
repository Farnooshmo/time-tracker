# Todo List Time Tracker
A simple web application for managing your tasks and tracking the time spent on each task.

# Demo:
 time-tracker-team.vercel.app/

## Description
The Todo List Time Tracker is a web-based application that allows users to create, manage, and track their tasks. It provides functionalities to add new tasks, start and stop timers for each task to track time spent, update task descriptions, delete tasks, and view summaries of daily, weekly, and monthly activity.


## Features
- Create new tasks with descriptions and dates.
- Start and stop timers to track time spent on tasks.
- Update task descriptions and delete tasks.
- View summaries of daily, weekly, and monthly activity.
- RESTful API endpoints for integration with other applications.

# project structure:
The repository is structured as follows:
client/: Contains the front-end code built with React. server/: Contains the back-end code built with Node.js, Express and Postgres.

Getting Started
To run the Time tracker web App locally, follow these steps:
Clone the repository:
https://github.com/Farnooshmo/time-tracker

Front-end (client)
1. Open a terminal and navigate to the client/ directory.
2. Run the following command to install the front-end dependencies:
    npm installl
3. After the installation is complete, start the development server with the following command:
    npm start
4. The front-end should now be running locally. Open your web browser and navigate to http://localhost:3000 to access the application.

Back-end (server)
1. Open a terminal and navigate to the server/ directory.
2. Run the following command to install the back-end dependencies:
npm install
3. Set up the database by following these steps:
. Ensure you have PostgreSQL installed and running on your machine.
. Create a new database.
. Update the database connection details in the server/Readme.md file.
4. Start the back-end server with the following command:
npm index.js
5. The back-end server should now be running locally on http://localhost:5001.

Technologies Used
The Time Tracker app utilizes the following technologies and frameworks:

. Front-end: React, JavaScript, CSS.
. Back-end: Node.js, Express, PostgreSQL.
. Database: PostgreSQL.

## Endpoints

- `POST /todos`: Create a new task.
- `GET /todos`: Get all tasks.
- `GET /todos/:id`: Get a specific task by ID.
- `PUT /todos/:id`: Update a task by ID.
- `PUT /todos/:id/start`: Start timer for a task.
- `PUT /todos/:id/end`: Stop timer for a task.
- `DELETE /todos/:id`: Delete a task by ID.
- `GET /total-daily-time`: Get total daily activity time.
- `GET /total-weekly-time`: Get total weekly activity time.
- `GET /total-monthly-time`: Get total monthly activity time.
- `PUT /calculate-todays-activity`: Calculate and update total activity time for a specific day.


## License
This project is made in cooperation with CodeYourFuture organization.

# contributers:
https://github.com/Farnooshmo
https://github.com/Meysam-Arshadi
https://github.com/elahemortazavi

## Contact
For any inquiries or feedback, please contact:
farnooshmoayeri@gmail.com
meysamarshadi@gmail.com
emor5680@gmail.com

## Contributing
Contributions to the time tracker web App project are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.










