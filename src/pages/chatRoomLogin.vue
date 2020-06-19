<template>
   <div class="chatRoomLogin">
    <input type="text" class="userName" placeholder="输入成员名称" v-model="userName">
    <div class="login" @click="handleClick">加入会议</div>
  </div>
</template>

<script>
export default {
  name: 'chatRoomLogin',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    handleClick () {
      this.socket.emit('login', {
        userName: this.userName
      })
      this.$emit('change')
      this.$store.commit('change', {
        userName: this.userName,
        uuid: this.$route.params.uuid
        })
    }
  }
}
</script>

<style lang="stylus">
.chatRoomLogin
    display: flex;
    flex-direction : column
    justify-content: center;
    width: 300px
    height: 180px
    position: fixed
    margin: auto
    top: 0
    right: 0
    bottom: 0
    left: 0
    border: 1px solid
    border-radius: 10px
    .userName
      width: 150px
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