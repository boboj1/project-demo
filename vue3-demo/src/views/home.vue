<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(0)

const changeNum = () => {
  num.value++
}
</script>

<template>
  <div class="home_page">
    <div>当前数字: {{ num }}</div>
    <button @click="changeNum">增加</button>
  </div>
</template>

<style lang="scss">
.home_page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
