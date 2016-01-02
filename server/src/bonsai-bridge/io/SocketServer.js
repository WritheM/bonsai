import SocketClient from './SocketClient';

export default class SocketServer {
    constructor(tracker, port) {
        this.tracker = tracker;
        this.port = port;

        this.server = null;
        this.socket = null;

        this.clients = {};
    }

    listen() {
        this.server = require('http').createServer();
        this.socket = require('socket.io')(this.server);

        this.server.listen(this.port);
        this.socket.on('connection', (s) => this.accept(s));
    }

    close() {

        console.log(' [-] Closing Bridge Server.');

        if (this.socket) {
            this.socket.close();
        }

        this.socket = null;

        if (this.server) {
            this.server.close();
        }

        this.server = null;
    }

    accept(socket) {

        console.log(' [+] New Connection (' + socket.id + ')');

        let connection = this.tracker.connection(socket.id);
        let client = new SocketClient(socket, connection);
        this.clients[socket.id] = client;

        client.on('disconnect', () => {

            console.log(' [-] Lost Connection (' + socket.id + ')');

            this.reject(socket);
        });

    }

    reject(socket) {
        if (this.clients[socket.id]) {
            var client = this.clients[socket.id];
            if (client && client.connection) {
                client.connection.kill();
            }

            delete this.clients[socket.id];
        }

        socket.disconnect();
    }
}
