# MyWebApp

Simple web app with web components

## Installation

* Install Node.js

Go to [Node website](https://nodejs.org/en/)

* Install Yarn
  (npm should work as well)

Go to [Yarn website](https://yarnpkg.com/en/docs/install#mac-tab)

A very cool dependency management

## Usage

* Clone or Download the project

* Install dependencies

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

* Go to localhost

a) for dev build: [localhost:8000](http://localhost:8000/)

b) for prod build: [localhost:8080](http://localhost:8080/)

## Test

* Install [Web-Component-Tester](https://github.com/Polymer/web-component-tester)

```
yarn global add web-component-tester
cd MyWebApp
bower install --save-dev web-component-tester
```

then launch test

```
cd MyWebApp
yarn test
```

## Conclusion

This is just a simple example with Web Components.
