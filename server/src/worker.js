///////////////////////////////////////////////////
// Worker Bootstrapper
//
// Responsible for setting up module path(s) and
// the polyfill before launching the app.

require('app-module-path').addPath(__dirname);
require('babel-polyfill');
require('bonsai-worker');