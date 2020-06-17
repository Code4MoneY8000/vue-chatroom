<template>
  <div class="chatLogin">
    <input type="text" class="chatName" placeholder="输入会议名称" v-model="chatName">
    <input type="text" class="userName" placeholder="输入成员名称" v-model="userName">
    <div class="login" @click="handleClick">创建会议</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      chatName: '',
      userName: ''
    }
  },
  computed: {
    name () {
      return {
        chatName: this.chatName, 
        userName: this.userName
      }
    }
  },
  methods: {
    getuuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16);
    })
    },
    handleClick () {
      this.$router.push('/'+this.getuuid())
      this.$store.commit('change', this.name)
      this.socket.emit('login', this.name)
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .chatLogin
    width: 300px
    height: 180px
    display: flex
    flex-direction:column
    justify-content: center
    position: fixed
    margin: auto
    top: 0
    right: 0
    bottom: 0
    left: 0
    border: 1px solid
    border-radius: 10px
    .chatName
      width:150px
      margin: 20px auto
      border: 1px solid
      padding-left: 5px
      border-radius: 5px
    .userName
      width:150px
      margin: 20px auto
      margin-top:0px
      border:1px solid
      padding-left: 5px
      border-radius: 5px 
    .login
      margin: 0 auto
      padding: 2px 10px
      border: 1px solid 
      border-radius: 5px
      background: white
</style>
