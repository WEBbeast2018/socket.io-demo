const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let counter = 0;

// serve client files
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  // get data from client
  socket.on('reset event', () =>{
    console.log('reset ');
    counter = 0;
  });


  setInterval(() => {
    counter++;
    socket.emit('counter', counter);
  }, 2000);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});