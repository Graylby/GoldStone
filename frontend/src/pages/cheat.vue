<template>
  <div>
    <nut-form>
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
  </div>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";

const myName = ref('')
const targetName = ref('')
const socket: any = inject('socket')

const toMessages = () => {
  socket.emit('login', 1)
  socket.emit('myEvent', 1, 1, 1)
  socket.on('myEventResult', (res: any) => {
    console.log(res)
    alert(res)
  })
}
</script>

<style scoped lang="scss">

</style>
