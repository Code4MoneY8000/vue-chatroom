<template>
  <div>
    <chatRoomLogin v-if="!loginOrNot" @change='handleShow'></chatRoomLogin>
    <div class="chatWrapper" v-if="loginOrNot">
      <div class="chatLeft">
        <div class="leave" @click='handleLeave'>离开聊天室</div>
        <div class="listWrapper">
          <div class="desc">用户列表</div>
          <div v-for="(item,index) of userList" :key="index" class="userList">
            {{item}}
          </div>
        </div>
      </div>
      <div class="chatRight">
        <div class="chatRoomName">{{chatRoomName}}</div>
        <div class="chatWrapper">
          <div class="messageContentWrapper" ref="message">
            <div class="message" v-for="(item,index) of chat" :key="index" >
              <div v-if="item.id == 1" class="systemMessage">
                欢迎{{item.name}}加入会议室
              </div>
              <div v-else-if="item.id == 2" class="systemMessage">
                {{item.name}}离开了会议室
              </div>
              <div v-else-if="item.id == 3" class="myMessageWrapper">
                <div class="myName coname">{{item.name}}</div>
                <div class="myMessage comessage">{{item.message}}</div>
              </div>
              <div v-else-if="item.id == 4" class="otherMessageWrapper">
                <div class="otherName coname">{{item.name}}</div>
                <div class="otherMessage comessage">{{item.message}}</div>
              </div>
            </div>
          </div>
          <div class="inputContentWrapper">
            <textarea  id="input" contenteditable='false' cols="100" rows="3" v-model="message"></textarea>
            <div class="sendButton" @click="handleSend">发送</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatRoomLogin from './chatRoomLogin'
export default {
  name: 'chatRoom',
  data () {
    return {
      chatRoomName: '',
      show: false,
      userList: [],
      UUID: '',
      check: false,
      chat: [],
      message: '',
      loginOrNot: false
    }
  },
  components: {
    chatRoomLogin
  },
  updated () {
    this.scrollToBottom() 
   },
  mounted () {
    this.init()
    this.giveChatName()
    this.yesOrNo()
    this.updateUserList()
    this.welcome()
    this.goodbye()
    this.accept()
    this.scrollToBottom() 
  },
  beforeDestroy () {
    this.exit()
  },
  watch: {
    show () {
      if(this.show && this.check){
        this.loginOrNot = true
        this.join()
      }
    },
    chatRoomName () {
      if(this.$store.state.chatName == this.chatRoomName){
        this.loginOrNot = true
        console.log('hello')
        this.socket.emit('login', {
          userName: this.$store.state.userName
        })
        this.join()
      }
    }
  },
  methods: {
    handleLeave () {
      this.$router.push('/')
      this.exit()
    },
    //Login后进入聊天室页面
    handleShow () {
      this.show = true
    },
    handleSend () {
      let sendmessage = {
        name: this.$store.state.userName,
        message: this.message,
        id: 3
      }
      this.socket.emit('send', sendmessage)
      this.chat.push(sendmessage)
      this.message = ''
    },
    accept () {
      this.socket.on('accept', data => {
        if (data.name !== this.$store.state.userName) {
          this.chat.push(data)
        }
      })
    },
    init () {
      this.socket.emit('init')
    },
    giveChatName () {
      var chatName = ''
      this.socket.on('giveChatName', data => {
        this.chatRoomName = data
      })
    },
    join () {
      this.socket.emit('join',this.$store.state.userName)
    },
    updateUserList () {
      this.socket.on('updateUserList', data => {
        this.userList = data
      })
    },
    goodbye () {
      this.socket.on('goodbye', data => {
        this.deleteUser(data)
      })
    }, 
    welcome () {
      this.socket.on('newUserComein', data => {
        this.addNewUser(data)
      })
    },
    addNewUser (data) {
      let newUser = {
        name: data,
        id: 1
      }
      this.chat.push(newUser)
    },
    deleteUser (data) {
      let deleteUser = {
        name: data,
        id: 2
      }
      this.chat.push(deleteUser)
    },
    yesOrNo () {
      this.socket.on('yesOrNo', data => {
        console.log(this.$route.params.uuid)
        console.log(data)
        if(this.$route.params.uuid == data){
          this.check = true
        }
      })
    },
    scrollToBottom () {
      this.$nextTick(() => {
        if(this.$refs['message'])
         var container = this.$refs['message']
         container.scrollTop = container.scrollHeight;
       })
    },
    exit () {
      this.socket.emit('disconnect', this.$store.state.userName)
    }
  }  
}
</script>

<style lang="stylus">
.chatWrapper
  display: flex
  height: 600px
  .chatLeft
    flex:1
    .leave
      margin: 20px auto
      width: 200px
      height: 50px
      border: 1px solid
      line-height : 50px
      text-align : center
    .listWrapper
      padding-top: 20px
      height: 600px
      margin: 40px auto
      border: 1px solid 
      width : 250px
      .desc
        font-weight: bold
        font-size: 20px 
        text-align : center
      .userList
        height: 20px
        font-size: 18px
        line-height: 20px
        margin: 10px auto
        text-align: center
  .chatRight
    flex:3
    .chatRoomName
      line-height: 50px
      text-align: center
      margin : 0 auto
      margin-top: 100px
      width: 400px
      border: 1px solid
      height: 50px
    .chatWrapper
      margin: 0 auto
      margin-top : 50px
      width : 800px
      height: 500px
      border: 1px solid 
      display: flex
      flex-direction : column
      .messageContentWrapper
        overflow-y: auto
        max-height :360px
        flex: 3
        display: flex
        flex-direction : column
        justify-content: flex-start
        border-bottom : 1px solid
        .message
          text-align: center
          display:flex
          flex-direction : column
          .systemMessage
            align-self: center
            background : #cccccc
            padding: 8px
            margin:10px auto
            border-radius: 3px
            color: #F8F8FF
          .myMessageWrapper
            margin-bottom : 20px
            align-self: flex-end
            .myName
              font-weight: bold
              font-size: 20px
              margin-right :15px
              text-align: right
            .myMessage
              margin-right: 30px
          .otherMessageWrapper
            margin-bottom : 20px
            align-self: flex-start
            .otherName
              margin-left: 15px
              text-align: left 
            .otherMessage
              margin-left : 30px
      .inputContentWrapper
        position : relative
        flex: 1
        padding: 8px
        .input
          resize : none 
        .sendButton
          position: absolute
          padding: 5px 20px
          bottom : 20px
          right: 20px
          background : #828282 
          color : white
  .coname
    font-weight: bold
    font-size: 20px
    margin-bottom: 5px
  .comessage
    font-size: 15px
    border-radius: 5px
    background: #828282
    color : white
    padding: 10px
</style>