const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send('error: ' + err);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('The server is listening on port', port);
});

//server that mounts on NodeJS HTTP server
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`User ${socket.id} has joined the map`);
  socket.emit('new-user', socket.id);

  socket.on('chatMessage', (msg) => {
    console.log('New Message:', msg);
    socket.emit('new-message', msg);
    socket.broadcast.emit('receive-message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has left the map`);
  });
});
