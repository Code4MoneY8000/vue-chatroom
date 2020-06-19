var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//生成uuid
var getuuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16);
})
}
//记录所有登陆过的用户
const usersList = []
let chatName = ''
var uuid = ''
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('一位用户进入')
  socket.on('newChat', data => {
    uuid = getuuid()
    console.log(uuid)
    socket.emit('newChatUUID', uuid)
  })
  socket.on('login', data => {
    if(data.chatName){
      chatName = data.chatName
    }
    //判断用户是否之前登陆过
    if(usersList.indexOf(data.userName) == -1){
      socket.userName = data.userName
      usersList.push(data.userName)
      console.log(usersList)
    }else{
      console.log('用户已经存在')
    }
  })

  socket.on('init', data => {
    socket.emit('giveChatName',chatName)
    socket.emit('yesOrNo', uuid) 
  })
  socket.on('join', data => {
    io.emit('updateUserList', usersList)
    io.emit('newUserComein',data)
  })
  socket.on('send',data => {
    data.id = 4
    io.emit('accept', data)
  })
  socket.on('disconnect', () => {
    let idx = usersList.findIndex(item => item == socket.userName)
    if(idx != -1){
      usersList.splice(idx, 1)
      io.emit('updateUserList', usersList)
      io.emit('goodbye',socket.userName)
      console.log(usersList)
    }
  })
  socket.on('exit', (data) => {
    let idx = usersList.findIndex(item => item == socket.userName)
    if (idx != -1) { 
      usersList.splice(idx, 1)
      io.emit('updateUserList', usersList)
      io.emit('goodbye',socket.userName)
      console.log(usersList)
    }
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
