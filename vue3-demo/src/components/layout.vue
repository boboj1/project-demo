<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const curPath = computed(() => route.path)
</script>

<template>
  <div class="admin_layout">
    <el-container>
      <el-aside width="200px">
        <el-menu router :default-active="curPath" class="el-menu-vertical-demo">
          <el-menu-item index="/admin/home">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/admin/dashboard">
            <span>面板</span>
          </el-menu-item>
          <el-menu-item index="/admin/settings">
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.admin_layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    border-right: 1px solid #e2e2e2;
  }
  .el-menu {
    border-right: none;
  }
  .el-header {
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>
