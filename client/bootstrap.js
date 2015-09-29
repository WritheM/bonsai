// A quick static server for hosting the compiled project
// Should be launched with pm2 if possible

var connect         = require('connect'),
    serveStatic     = require('serve-static');

connect()
    .use(serveStatic('.'))
    .listen(8080);
