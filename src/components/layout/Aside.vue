<template>
  <!-- 侧边栏 -->
  <el-menu
    default-active="2"
    class="mymenu el-menu-vertical-demo"
    background-color="#fff"
    text-color="#000"
    :router="true"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="users">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">用户列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>角色管理</span>
      </template>
      <el-menu-item index="roles">
        <template slot="title"> 
          <i class="el-icon-menu"></i>
          <span class="myspan">角色列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="rights">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">权限列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">商品列表</span>
        </template>
      </el-menu-item>
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">分类参数</span>
        </template>
      </el-menu-item>
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">商品分类</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">订单列表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据列表</span>
      </template>
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">数据统计</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>

<style scoped>
.mymenu {
  height: 100%;
}
</style>
