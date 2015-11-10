require("babel-core/polyfill");

import * as Rabbit from "../Rabbit";
import {bridge as config} from "config";
import EventEmitter3 from "eventemitter3";

process.on('unhandledRejection', function(error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

class Bridge {
    constructor(client, broadcast) {
        this.client = client;
        this.broadcast = broadcast;

        this.emitter = new EventEmitter3({
            delimiter: ":", //the .'s are for path, : is for action which you're more likely to wildcard
            wildcard: true
        });


        this.connections = [];
        this.session = new Session(this);

        var app = require('http').createServer();
        var io = require('socket.io')(app);
        app.listen(config.port);
        io.on('connection', this.connection.bind(this));
    }

    connection(socket) {
        let connection = new Connection(socket);
        this.connections.push(connection);

        console.log("connected");

        this.emitter.emit("connect", socket);

        socket.on("rpc", (data, callback) => {
            data.conn = connection.serialize();

            console.log("received rpc", data);
            this.client.call(data).then((content) => {
                console.log("response:", content);

                // Call the emitter early so it can augment the data before sending it back.
                this.emitter.emit(data.path, connection, data, content.data);

                callback(content);
            }).catch((content) => {
                console.log("response (err):", content);
                callback(content);
            });
        });

        socket.on("disconnect", () => {
            this.emitter.emit("disconnect", connection);
            var idx = this.connections.indexOf(connection);
            if (idx >= 0) {
                this.connections = this.connections.splice(idx, 1);
            }
        });
    }

    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
}

//represents each individual socket.io connection
class Connection {
    constructor(socket) {
        this.socket = socket;

        this.emitter = new EventEmitter3();

        this.user = {};
        this.perms = {};
        this.session = {};
        this.rooms = [];

        socket.on("send", (data, callback) => {
            callback(this.emitter.emit(data.event, data));
        });
    }

    serialize() {
        return {
            user: this.user,
            perms: this.perms
        }
    }

    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }

    send(event, data) {
        let payload = {event:event, data:data};
        this.socket.emit("broadcast", payload);
    }
}

//state tracking, maps the single rabbitmq connection (Bridge)
// to each individual socket.io connection (Connection)
class Session {
    constructor(bridge) {
        this.bridge = bridge;
        this.broadcast = bridge.broadcast;

        this.users = {}; // key: userid, contain a list of socket objects
        this.rooms = {}; // key: roomid, contain a list of socket objects

        bridge.on("connect", this.connect);
        bridge.on("disconnect", this.disconnect);

        bridge.on("Session:register", this.apiRegister);

        bridge.on("Session:login", this.apiLogin);
        bridge.on("Session:loginToken", this.apiLogin);

        bridge.on("Session:logout", this.apiLogout);

        bridge.on("Session:ping", this.apiPing);

        bridge.on("Session:joinRoom", this.apiJoinRoom);
        bridge.on("Session:leaveRoom", this.apiLeaveRoom);
    }

    connect = (connection) => {

    };

    disconnect = (connection) => {
        connection.rooms.forEach((room) => {
            this.roomDelConnection(room, connection, "disconnect");
        });

    };

    apiRegister = (connection, data, response) => {

    };

    //in terms of response, loginToken and login are the same
    apiLogin = (connection, data, response) => {
        connection.user = response.user;
        connection.session = response.session;
        connection.perms = response.perms;

        //todo: broadcast login
    };

    apiLogout = (connection, data, response) => {

        // Logout should copy the response values from
        // the worker in-case the decision was overridden,
        // this should return as a guest.

        connection.user = response.user;
        connection.session = response.session;
        connection.perms = response.perms;

        //todo: broadcast logout
    };

    apiPing = (connection, data, response) => {
        response.user = connection.user;
        response.session = connection.session;
        response.perms = connection.perms;
    };

    apiJoinRoom = (connection, data, response) => {
        let id = response.room.id;
        if (!this.rooms[id]) {
            this.rooms[id] = new Room(response, this.broadcast);
        }

        let room = this.rooms[id];

        room.addConnection(connection);
        connection.rooms.push(room);
    };

    apiLeaveRoom = (connection, data, response) => {
        this.roomDelConnection(this.rooms[response.id], connection, "part");
    };

    roomDelConnection(room, connection, reason) {
        room.delConnection(connection, reason);
        if (room.connections.length <= 0) {
            //note: we're iterating user list, and deleting from global dict
            // so is valid to delete while iterating ;)
            room.deconstructor();
            delete this.rooms[room.id];
        }
    }

}

//room RPC logic will be fired from Session
// room will however directly listen on broadcasts
class Room {
    constructor(state, broadcast) {
        this.state = state;
        this.room = state.room;
        this.broadcast = broadcast;

        this.connections = [];
        this.history = [];

        this.token = "room."+state.room.slug+".";

        broadcast.subscribe(this.token+"*");
        broadcast.on(this.token+"*", this.roomBroadcast);
    }

    deconstructor() {
        this.broadcast.unsubscribe(this.token+"*");
        this.broadcast.off(this.token+"*", this.roomBroadcast);
    }


    //from rabbitmq
    roomBroadcast = (data) => {
        console.log("room broadcast", data);
        this.connections.forEach(conn => {
            conn.send(data.event, data.data);
        });
    };

    //this is a message that the user sent..
    userSend = (data) => {
        //todo: filter
        this.broadcast.broadcast(data.event, data.data);
    };

    addConnection = (connection) => {
        connection.on(this.token+"*", this.userSend); //hook broadcasts here

        this.connections.push(connection);

        //trigger joined broadcast msg
        this.broadcast.broadcast(this.token+"join", {
            slug: this.room.slug,
            user: connection.user.id
        });

        console.log("connect (room "+this.room.id+", users: "+this.connections.length+")");
    };

    delConnection = (connection, reason) => {
        connection.off(this.token+"*", this.userSend); //unhook here

        var idx = this.connections.indexOf(connection);

        if (idx > -1)
            this.connections.splice(idx, 1);

        console.log("disconnect (remaining connections: "+this.connections.length+")");

        //trigger parted broadcast msg
        this.broadcast.broadcast(this.token+"part", {
            event: "part",
            slug: "writhem",
            user: connection.user.id,
            reason: reason
        });
    };

}

let client = new Rabbit.Client();
let b = new Rabbit.Broadcast();

Promise.all([client.listen(), b.listen()]).then( () => {
    let bridge = new Bridge(client, b);
}).catch(e => {
  console.error(e);
    console.error(e.stack)
});

