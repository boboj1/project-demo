<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      // 获取用户列表
      // const userList = []
      console.log()
      console.log(this.formData)
    },
  },
}
</script>

<style scoped></style>
