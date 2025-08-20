<script lang="ts" setup>
const obj: any = {
  data: 'home',
}

const p = new Proxy(obj, {
  get(target, key) {
    console.log('get', key)
    return target[key]
  },
  set(target, key, value) {
    console.log('set', key, value)
    target[key] = value
    return true
  },
})
</script>

<template>
  <div class="home_page"></div>
</template>

<style lang="scss">
.home_page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
