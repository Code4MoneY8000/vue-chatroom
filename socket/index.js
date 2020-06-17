var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//记录所有登陆过的用户
const usersList = []
let chatName = ''
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('一位用户进入')
  socket.on('newchat', data => {
    
  })
  socket.on('login', data => {
    if(data.chatName){
      chatName = data.chatName
    }
    //判断用户是否之前登陆过
    if(!usersList.find(item => item.username == data.userName)){
      usersList.push(data.userName)
      console.log(usersList)
    }else{
      console.log('用户已经存在')
    }
  })
  socket.on('getChatName', data => {
    socket.emit('giveChatName', chatName)
  })
  socket.on('join', data => {
    io.emit('enter', usersList)
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
