var express = require('express');
var bodyParser = require('body-parser');
var app=express();

var server = app.listen(5000);
var io = require('socket.io').listen(server);


//Set the public folder
app.use(express.static(__dirname + '/public'));

//Allows us to parse POST data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Serve the Homepage
app.get('/',function(req,res){
    res.sendFile(__dirname+ '/public/index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    /**
     * Receives the Message body and sends to everyone
     */
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});
