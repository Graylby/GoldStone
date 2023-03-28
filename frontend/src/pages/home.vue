<template>
  <div>
    <div v-for="v in 100">
      {{ v }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";

const myName = ref('')
const targetName = ref('')
const socket: any = inject('socket')

</script>

<style scoped lang="scss">

</style>
