# MyWebApp
It's my web app

## Before start implementing

1) How can you initialize and render the widget in that Web page? How can communicate
the Web app with the Parking widget (and vice versa)?

I can use Web Components. 
The Web app can communicate with the Parking widget through the attributes/properties.
The Parking windget can communicate with the Web app through the Custom Event.

2) How can you guarantee that another developer can modify your code without breaking
the features? How can you guarantee to modify your code during a refactoring without
breaking any functionality?
For this purpose, I can use unit and e2e test.

3) How do you differentiate desktop and mobile devices?
I can differentiate desktop and mobile devices using media query.

## Installation
- Install Node.js

Go to [Node website](https://nodejs.org/en/)

- Install Yarn
(npm should work as well)

Go to [Yarn website](https://yarnpkg.com/en/docs/install#mac-tab)

A very cool dependency management

## Usage
- Clone or Download the project

- Install dependencies
```
cd MyWebApp
yarn install
```

a) for dev build
```
cd MyWebApp
yarn run dev
```

b) for prod build

```
cd MyWebApp
yarn run build 
```

Install [http-server](https://github.com/indexzero/http-server)

A command-line http server
```
yarn global add http-server
```
then 

```
cd MyWebApp/dist
http-server
```

- Go to localhost

a) for dev build: [localhost:8000](http://localhost:8000/)

b) for prod build: [localhost:8080](http://localhost:8080/)

## Test
- Install [Web-Component-Tester] https://github.com/Polymer/web-component-tester

```
yarn global add web-component-tester

bower install --save-dev web-component-tester
```
then launch test

```
cd MyWebApp
yarn test
```
