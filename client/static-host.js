///////////////////////////////////////////////////////
// Static Host Simple Server

var connect     = require('connect'),
    serveStatic = require('serve-static');

connect()
    .use(serveStatic('./bin/public/'))
    .listen(8080);
