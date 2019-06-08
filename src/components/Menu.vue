<template>
<!-- 默认高亮 -->
<!-- default-active,     -->
     <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isShow"
      >
      <el-submenu index="1">
          <!-- slot是模板中的数据 这里不用-->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>购物商城</span>
        </template>
        <el-menu-item index="1-1">
          <template slot="title">商品管理</template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <template slot="title">栏目管理</template>
        </el-menu-item>
      </el-submenu>
       <el-submenu index="2">
          <!-- slot是模板中的数据 这里不用-->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>购物</span>
        </template>
        <el-menu-item index="2-1">
          <template slot="title">已购</template>
        </el-menu-item>
        <el-menu-item index="2-2">
          <template slot="title">未购</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  props:["isShow"]
}
</script>

<style>
    .el-menu-vertical-demo{
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
  }
</style>
