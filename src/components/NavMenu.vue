<template>
  <div class="menu">
    <el-row class="menu_row flex_center">
      <el-col :span="4" class="logo">
        <div>zhouqiii</div>
      </el-col>
      <el-col :span="20">
        <el-menu
          :default-active="this.$route.path"
          router
          mode="horizontal"
          class="menu_vertical"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2d303a"
          text-color="#fff"
          active-text-color="#2d8cf0"
        >
          <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
            <template slot="title">
              <i :class="item.icon"></i>
              <span class="nav_title"> {{ item.navItem }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      navList: [
        { name: '/Commidity', navItem: '商品', icon: 'el-icon-s-home' },
        { name: '/FrmLoss', navItem: '物料损耗', icon: 'el-icon-document' },
        { name: '/Commidity3', navItem: '周边', icon: 'el-icon-folder' },
        { name: '/Commidity4', navItem: '运输', icon: 'el-icon-coin' },
        { name: '/Commidity5', navItem: '工具', icon: 'el-icon-monitor' },
        { name: '/Commidity6', navItem: '老袁水果', icon: 'el-icon-aim' },
        { name: '/Commidity7', navItem: '其他成本一', icon: 'el-icon-aim' },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.menu {
  text-align: center;
  .logo {
    font-size: 16px;
  }
  .menu_vertical {
    .nav_title {
      font-size: 16px;
    }
  }
}
</style>
