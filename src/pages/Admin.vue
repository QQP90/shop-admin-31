<template>
  <div>
    <el-container>
      <el-aside width="auto">
          <Menu :isShow="isShow" />
      </el-aside>
      <el-container>
        <el-header>
            <Header @click="handleClickShow" />
        </el-header>
        <el-main>
           <Breadcrumbs />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Breadcrumbs from "../components/Breadcrumbs.vue";
import Menu from "../components/Menu.vue"
export default {
    components:{
        Header,
        Breadcrumbs,
        Menu
    },
    data(){
        return {
              isShow:false
        }
      
    },
    methods:{
        handleClickShow(){
            this.isShow=!this.isShow
        }
    }

};
</script>

<style>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* line-height: 160px; */
  }
  
  body > div > .el-container {
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
