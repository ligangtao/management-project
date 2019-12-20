<template>
  <!-- 侧边栏 -->
  <!-- 
        el-menu: 菜单栏的管理标签
          default-active：默认激活的菜单
          open: 菜单栏展开的事件
          close：菜单栏关闭的事件
          background-color：背景颜色
          text-color：文本颜色
          active-text-color：激活文件颜色
          unique-opened: 是否是展开一会子选项
          router: 开启 vue-router 模式，允许将 index 作为跳转的路由
        el-submenu：菜单栏的子选项
          index: 当前子选项的下标
          template: 结构的模板
            slot：设置导航的一级菜单
        el-menu-item-group：一级菜单下二级菜单的分组
        el-menu-item： 二级菜单
    -->
  <el-menu
    default-active="2"
    class="mymenu el-menu-vertical-demo"
    background-color="#fff"
    text-color="#000"
    :router="true"
    :unique-opened="true"
  >
    <el-submenu
      v-for="(item1, index1) in menuslist"
      :key="index1"
      :index="item1.path"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item1.authName }}</span>
      </template>
      <el-menu-item
        v-for="(item2, index2) in item1.children"
        :key="index2"
        :index="item2.path"
      >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">{{ item2.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>角色管理</span>
      </template>
      <el-menu-item index="/roles">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span class="myspan">角色列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/rights">
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
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuslist: []
    };
  },
  //动态生成左侧菜单栏
  methods: {
    async getMenusList() {
      let res = await this.$http.get("menus");
      // console.log(res);
      //解构赋值
      let { meta, data } = res.data;
      //判断
      if (meta.status === 200) {
        // 报数据保存到menuslist中
        this.menuslist = data;
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  //渲染页面
  mounted() {
    this.getMenusList();
  }
};
</script>

<style scoped>
.mymenu {
  height: 100%;
}
</style>
