# Available commands

The following document aims to list projet available commands required to have the best development experience possible.
All commands are either `backend` commands or `client` commands. Please make sure you navigate to the corresponding directory of your local project before running them.

## Backend

### `yarn`

Install project dependancies. Only required to be run once at the begining of the project.

### `yarn add`

Add a new project dependancy.

### `yarn deploy`

Deploy backend stack to AWS.
Finally outputs backend URLs associated with the stack. Each of those URLs are resources that you client app can call.
You can alternatively use Postman to test each of those URLs.

### `sls invoke local -f <functionName>`

Invoke function locally, very useful to test

### `sls logs -f <functionName>`

Recover latest execution logs from cloudwatch

## Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the `client` project directory, you can run:

### `yarn`

Install project dependancies. Only required to be run once at the begining of the project.

### `yarn add`

Add a new project dependancy.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn storybook`

Runs the storybook in the development mode.<br>
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn add some-dependency`

Adds a dependency to the project. You can then use it in any file by adding `import { what-i-need } from some-dependency`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
To learn [CSS](https://www.w3schools.com/css/)
