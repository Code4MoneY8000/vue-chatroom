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
      userList: []
    }
  },
  components: {
    chatRoomLogin
  },
  mounted () {
    this.getChatName()
    this.giveChatName()
    this.enter()
  },
  computed: {
    loginOrNot () {
      if((this.$store.state.userName && this.$store.state.chatName == this.chatRoomName) || this.show){
        this.join()
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    handleLeave () {
      this.$router.push('/')
    },
    //Login后进入聊天室页面
    handleShow () {
      this.show = true
    },
    getChatName () {
      this.socket.emit('getChatName', '')
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
    enter () {
      this.socket.on('enter', data => {
        this.userList = data
      })
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
</style>