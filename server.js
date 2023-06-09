
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 5000;
var ctr=0;



app.use('/',express.static('public_static'));

io.on('connection',function (socket) {
    console.log("connnected client");
    if (ctr == 0) {
        console.log("FirstPerson");
        socket.emit("first", "first");
    }
    ctr++;
    socket.on('subscribe',function (room) {
       socket.join(room);
    });
    socket.on("disconnect", function () {
        console.log("Client Disconnected");
        ctr--;
    });
    socket.on('song0',function (data) {
        console.log('changing to ' + data);
        io.to(data).emit('song0','cute');
    });
    socket.on('song1',function (data) {
        console.log('changing to ' + data);
        io.to(data).emit('song1','desp');
    });
    socket.on('song2',function (data) {
        console.log('changing to ' + data);
        io.to(data).emit('song2','cute');
    });
    socket.on('song3',function (data) {
        console.log('changing to ' + data);
        io.to(data).emit('song3','desp');
    });
    socket.on('song4',function (data) {
        console.log('changing to ' + data);
        io.to(data).emit('song4','cute');
    });
    socket.on("play",function (data) {
       io.to(data.room).emit('playsong',data.times);
    });
    socket.on("pause",function (data) {
        io.to(data.room).emit('pausesong',data.times);
    });
    socket.on("where",function (data) {
        io.to(data.room).emit("current",data.times);
    });
});
http.listen(PORT,function () {
    console.log("server running on " + PORT);
});
