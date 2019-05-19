const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

let onlineList = [];

io.on('connection', (socket) => {
  let { name, socketID } = socket.handshake.query;
  socket.on('update_online', (newID) => {
    socketID = newID;
    onlineList.push({ name, socketID });
    io.emit('update_online', onlineList);
  });

  io.to(`${socket.id}`).emit('message', { content: `TIP: You can click online users to private message them!`, time: `${new Date().toLocaleTimeString().substring(0, 5)} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`, socketID, type: 'announcement' });
  io.emit('message', { content: `${name} has connected!`, time: `${new Date().toLocaleTimeString().substring(0, 5)} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`, socketID, type: 'announcement' });

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('private message', (data) => {
    io.to(`${data.privateMessage.socketID}`).emit('message', data.content);
  });

  socket.on('disconnect', () => {
    onlineList = onlineList.filter(user => user.socketID !== socketID);
    io.emit('update_online', onlineList);
    socket.broadcast.emit('stop typing', {name, socketID});
    io.emit('message', { content: `${name} has disconnected!`, time: new Date().toLocaleTimeString(), socketID, type: 'announcement' });
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stop typing', (data) => {
    socket.broadcast.emit('stop typing', data);
  });

});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});