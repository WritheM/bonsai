import * as Rabbit from "./Rabbit";

let clients = {};

let client = new Rabbit.Client();
client.listen().then(() => {

    var app = require('http').createServer();
    var io = require('socket.io')(app);

    app.listen(1337);


    io.on('connection', function (socket) {
        socket.on("rpc", function(data) {
            console.log("received rpc", data);
            client.call(data).then(function(response) {
                console.log("response:", response.content.toString());
                socket.emit("rpc", JSON.parse(response.content.toString()));
            }).catch(function(response) {
                console.log("response (err):", JSON.parse(response.content.toString()));
                socket.emit("rpc", JSON.parse(response.content.toString()));
            });
        })
    });


}).catch(e => {
    console.log(e);
});