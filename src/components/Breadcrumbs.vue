<template>
<el-breadcrumb separator="/" class="Breadcrumbs">
  <el-breadcrumb-item v-for="(item,index) in info" :key="index">
    {{item}}
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
import { constants } from 'crypto';
export default {
  data(){
    return {
      info:[]
    }
  },
  watch:{
    $route(){
      var arr = this.$route.matched
      let info = []
      arr.forEach(v=>{
      info.push(v.meta)
        
      })
     this.info = info
    }
  }
}
</script>

<style>
  .Breadcrumbs{
    padding: 0 0 10px 0;
    border-bottom: 1px solid #ddd;
  }
</style>
