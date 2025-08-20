<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>change content</div>
    <div>111</div>
    <HelloWorld :formData="formData" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      formData: {
        paperList: [],
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData.paperList = [
        {
          readUsers: [],
        },
      ]
    }, 1000)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
