<template>
  <div>
    <nut-navbar @on-click-back="onBack" :left-show="true" class="top_nav" :title="targetName"/>
    <nut-form v-if="!isTalking" class="form_box">
      <nut-form-item label="你的名字">
        <nut-input v-model="myName"/>
      </nut-form-item>
      <nut-form-item label="对方的名字">
        <nut-input v-model="targetName"/>
      </nut-form-item>
      <nut-cell>
        <nut-button block @click="toMessages()">开始聊天</nut-button>
      </nut-cell>
    </nut-form>
    <div v-else class="cheat_box">
      <div v-for="msg in messages" :key="msg.id">
        {{ msg.data }}
      </div>
      <div class="msg_input_box">
        <nut-input v-model="myMsg"/>
        <nut-button @click="onSend">发送</nut-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import service from "../../requset";

const myName = ref('')
const targetName = ref('')
const isTalking = ref(false)
const messages = ref([
  {
    id: Symbol(),
    data: '消息'
  },
  {
    id: Symbol(),
    data: '消息'
  },
  {
    id: Symbol(),
    data: '消息'
  },
  {
    id: Symbol(),
    data: '消息'
  },
  {
    id: Symbol(),
    data: '消息'
  },
])
const myMsg = ref('')
const myId = ref('')
const keys = ref(new Set())

const socket: any = inject('socket')
const router = useRouter()

const toMessages = () => {
  isTalking.value = true;
  socket.emit('login')
  socket.on('getLoginId', (res: any) => {
    myId.value = res
  })
  // socket.emit('myEvent', 1, 1, 1)
  // socket.on('myEventResult', (res: any) => {
  //   console.log(res)
  // })
}
const onBack = () => {
  router.back()
}
const onSend = () => {
  messages.value.push({
    id: Symbol(),
    data: myMsg.value,
  })
  // socket.emit('sendMsg', targetName, myMsg.value);
  const data = {
    id: myId.value,
    targetName: targetName.value,
    msg: myMsg.value,
    key: Date.now()
  }
  console.log(data)
  service.post('/test', data).then(res => {
    console.log(res)
  })
  socket.on('receiveMsg', (res: any) => {
    console.log(keys.value)
    console.log(res.key)
    if (!keys.value.has(res.key)) {
      console.log('meiyoukey')
      messages.value.push({
        id: Symbol(),
        data: res.msg
      })
    }
    console.log(res)
  })
  myMsg.value = ''
}
</script>

<style scoped lang="scss">
.top_nav {
  width: 100%;
  height: 60px;
}

.form_box {
  margin: 0 auto;
  width: 70%;
  border-radius: 70px;
  background: #e0e0e0;
  box-shadow: 41px 41px 82px #696969,
  -41px -41px 82px #ffffff;
}

.cheat_box {
  .msg_input_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #ffffff;
    display: flex;
    justify-content: center;
  }
}
</style>
