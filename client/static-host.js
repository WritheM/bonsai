///////////////////////////////////////////////////////
// Static Host Simple Server

var connect     = require('connect'),
    serveStatic = require('serve-static');

connect()
    .use(serveStatic('.'))
    .listen(8080);
