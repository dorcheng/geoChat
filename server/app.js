var express = require('express');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send('error: ' + err);
});

var port = 3000;
var server = app.listen(port, function() {
  console.log('The server is listening closely on port', port);
});

var socketio = require('socket.io');

var io = socketio(server);

io.on('connection', function(socket){
  console.log(`User ${socket.id} has joined the map`);
  socket.emit('new-user', socket.id);

  socket.on('disconnect', function(){
    console.log(`User ${socket.id} has left the map`);
  });
});
