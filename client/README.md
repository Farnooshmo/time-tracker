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










# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
