// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const socketIo = require("socket.io");
const http = require("http");
const client = require("./api/dbconnection/client");
var app = express();

const server = http.createServer(app);

const options = {
  allowEIO3: true,
  maxHttpBufferSize: 10e7
};

options.cors = { origin: ['http://localhost:3000'] };

const io = socketIo(options).listen(server);


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
let roomName = '192.168.0.85-1-chat';
io.on("connection", (socket) => {
  console.log('In connection');

  socket.on("streamerDetail", async (data) => {
    console.log('data from client of streamer==', data);

  
    socket.join(roomName);

    var getData = await client.json_get(`ChatRoom:${roomName}`);
    // io.to(roomName).emit("msg", getData);
    
    if (!getData) {
      await client.json_set(`ChatRoom:${roomName}`, ".", []);
    }else{
      // io.in(roomName).emit("msg", getData);
      console.log("getData------",getData);
      io.to(roomName).emit("allMessages", getData)
    }

  });

    socket.on("messages",async (msgData)=>{
      await client.json_arrappend(`ChatRoom:${roomName}`, ".", msgData);
      console.log("message drom streamer---",msgData);
      
      var messageData = await client.json_get(`ChatRoom:${roomName}`);
      console.log("getData------",messageData);
      console.log("roomName--",roomName);
      // io.in(roomName).emit("msg", getData);
      io.to(roomName).emit("allMessages", messageData);
    })

  

});

server.listen(8000, () => console.log(`Listening on port ${8000}`));

