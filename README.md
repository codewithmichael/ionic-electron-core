# ionic-electron-core

This is a simple application project core that uses Ionic and Electron to build
for both mobile and desktop environments.

## Tech

* [Node.js](https://nodejs.org/) + [NPM](https://www.npmjs.com/) +
  [Gulp](http://gulpjs.com/)
* [Ionic](http://ionicframework.com/) - Mobile Builds (iOS + Android)
  * Provides [Cordova](https://cordova.apache.org/),
    [AngularJS](https://angularjs.org/),
    UI components, and starter Styles/Icons/Animations
* [Electron](http://electron.atom.io/) - Desktop Builds (Windows + Mac + Linux)
  * Desktop files are added to the build via the `--desktop` build flag
* ES6 (ECMAScript 6)
  * Compiles to ES5 via [Babel](https://babeljs.io/)
* [Browserify](http://browserify.org/) - JavaScript modularization (CommonJS)
  * Allows reuse of modules on the front and back end (browser + Node.js)
  * Bundles all application code into a single export (or more if required)
  * ES6 includes are supported via [Babelify](https://github.com/babel/babelify)
* [Jade](http://jade-lang.com/) - HTML template preprocessor with imports and
  build-time logic
* [Sass](http://sass-lang.com/) (SCSS) - CSS template preprocessor with
  variables, functions, and nesting
* Minification of HTML/CSS/JS
  * Enabled via the `--production` build flag
* AngularJS Template Caching - Templates are compiled into the JavaScript

## Quick Start

Clone this repository:
```sh
$ git clone https://github.com/codewithmichael/ionic-electron-core.git
```

Change to the new directory and install required components:
```sh
$ cd ionic-electron-core
$ npm install
$ gulp install
```

Build and Test in a browser (use a recent WebKit-based browser):
```sh
$ gulp
$ ionic serve
```

**Note:** If you receive command not found errors when running gulp, ionic, or
electron then you only have them installed locally within the project. You may
install them globally, or you can run the local project binaries directly. They
are located in `./node_modules/.bin/`. You may add the directory to `$PATH` or
call it inline—for example, to build and test in a browser:
```sh
$ ./node_modules/.bin/gulp
$ ./node_modules/.bin/ionic serve
```

## Clean

A `.gitignore` file is provided to keep built files from being committed, but
you can also delete all built files at any time by running:
```sh
$ gulp clean
```

## Build for Mobile (Test)

To build for mobile, provide the `--mobile` flag when building the app source.
This will add a `script` tag to include `cordova.js` in the built app's
`index.html` file (see load reference in `src/index.jade`):
```sh
$ gulp --mobile
```

Next, use the Ionic CLI to build to your device (see below). The first time you
build you will need to "add" the build platform.

### Build and Run for iOS (Emulator)

A Mac is required to build for iOS. The following assumes you are on a Mac and
have XCode and an iOS emulator installed and functional.
```sh
$ gulp --mobile
$ ionic platform add ios
$ ionic emulate ios
```

Your running app can be debugged using Apple's Safari web browser.

### Build and Run for Android (Emulator)

Android apps can be built from any major OS. The following assumes you have
Java, the Android SDK, and an Android emulator installed and functional.
```sh
$ gulp --mobile
$ ionic platform add android
$ ionic emulate android
```

Your running app can be debugged using Google's Chrome web browser.

## Build for Desktop (Test)

To build for desktop, provide the `--desktop` flag when building the app source.
This will build both the app content (HTML/CSS/JS) and the Node.js script(s)
required by Electron.
```sh
$ gulp --desktop
```

Then run the app using Electron (from the project's root directory):
```sh
$ electron .
```

Web app content can be debugged by enabling the *Developer Tools* from the
Electron's default *View* menu.

As described in the
[Electron project documentation](https://github.com/atom/electron/blob/master/docs/tutorial/debugging-main-process.md),
if you need to debug the Electron app's main process, you can do so by appending
the `--debug` flag (with an optional port number), and then loading the
debugger UI in a browser window—i.e.:
```sh
$ electron --debug=5858 .
```
...and open http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 in Chrome.

## Production Builds

Production builds have their content minified. This significantly reduces
release package size, but makes it nearly impossible to debug.

To perform a production app build, just build as usual, but provide the
`--production` build flag—i.e. use one of the following commands:
```sh
$ gulp --production
$ gulp --mobile --production
$ gulp --desktop --production
```

The first command above can be useful to ensure minification doesn't break
you app code by testing the built and minified app in a browser—e.g.:
```sh
$ gulp --production
$ ionic serve
```

### Build for Mobile (Production):

Perform a production app build and then use Ionic CLI to build to your device.
Assuming you have already added the iOS platform to your Ionic project and you
have a registered developer device attached via USB, you may build and push to
the device as follows:
```sh
$ gulp --mobile --production
$ ionic run --device ios
```

To build for Android, replace `ios` with `android` in the `ionic`
line above.

See the Apple developer documentation and/or the Android developer documentation
for further details on packaging an application for official release in the
Apple App Store and/or Google Play Store.

### Build for Desktop (Production):

Perform a production app build and then use Electron to run the application
(from the project's root directory):
```sh
$ gulp --desktop --production
$ electron .
```

The steps that follow will depend on your chosen release platform(s) and how you
want to distribute your application.

For platform-specific details on rebranding and preparing your application for
distribution, see
[Electron's "Application Distribution" documentation](http://electron.atom.io/docs/latest/tutorial/application-distribution/).
