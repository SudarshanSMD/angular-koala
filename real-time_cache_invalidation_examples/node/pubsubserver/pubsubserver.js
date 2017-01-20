var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket){
   console.log('connection');
  socket.on('cache-invalidate-key', function (key) {
    console.log('new key recieved key: ', key);
    //socket.broadcast.emit('cache-invalidate-key', key);
     io.emit('cache-invalidate-key', key);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
