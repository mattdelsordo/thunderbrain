# Thunderbrain
This is where the readme is going to go! For now, we can use this as a teaching document to inform everyone on how this stack and the file structure even work. If you do something whack, add it here! For initial setup, Matt followed this tutorial: https://github.com/verekia/js-stack-from-scratc

## Script usage
Yarn/NPM let you implement scripts that run commands for testing/production utilities. You invoke them by doing "yarn (or npm) scriptname" in the console. Here's what they all do (add to this if you add scripts!):
* **start**: starts dev server (by calling dev:start)
* **dev:wds**: starts webpack dev server (in another terminal!)
* **test**: runs testing suite (eslint, flow, and jest)
* **precommit/prepush**: get called when you commit/push to make sure you dont commit/push non-functional code (not sure how much we really need this functionality??) 
* **prod:build**: builds project for production
* **prod:start**: starts production server
* **prod:stop**: stops production server (it's a separate proccess! don't just use ctrl^C!)

## Dependencies
* **Yarn**: Faster, fancier package manager that replaces NPM (not strictly necessary)

### Development
* **Babel**: compiler that turns fancy new-age ES6 code into old JS code so we can use fancy new features and still have it work in Internet Explorer
* **ESLint**: linter, airbnb presets are installed
* **Flow**: static type checker to avoid JS's shitty coercion bullshit
* **Jest**: JS testing library that can also test React components
* **Husky**: implements Git hooks so stuff gets tested before being committed

### Back-end
* **Express**: web application framework that runs the web app off a server rather than directly in the browser
* **Nodemon**: restarts Node server when file changes happen on it
* **PM2**: Node process manager
  * *rimraf*: cleans production folder before a new build
* **ImmutableJS**: used to manipulate collections by returning a new object instead of the original
* **Fetch**: function to make asynchronous calls
* **React Router**: allows you to navigate between multiple pages
* **Socket.IO**: Websockets

### Front-end
* **Webpack**: bundles all the code into a single JS file for the client to execute
* **React**: used to build interfaces using JSX syntax to create HTML elements with embedded JS
  * *React Helmet*: injects content to the <head> of the webpage
* **Redux/React Redux**: handles application lifecycle by creation a store which is the single "source of truth" for the application
* **Bootstrap**: UI component library