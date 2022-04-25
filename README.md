# Getting Started with "Experiment duration calculator" app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Special instructions

1. The input mask contains an extra spacing `DD / MM / YYYY` to make the UI better.
2. According to the task, incorrect date range `03/01/1989 - 03/08/1983` should return value: `1979`, what is wrong from a logical point of view, because this is an application for real life cases.
I guess, scientist should be informed about the incorrect range, therefore, an error will be shown for such cases.
3. The native HTML5 datepicker as an input would provide a better UX, especially for mobile devices, but was not considered because it could display data in `dd.mm.yyyy` format depending on location, that is not allowed.
4. Using additional libraries for input-mask, form validating and submitting would make the solution cleaner and more scalable, but in terms of needs (1 mask and 1 one form for two fields) it looks like an overhead for the test mini-project, so everything is custom.

## Available Scripts

After `yarn install` from the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
