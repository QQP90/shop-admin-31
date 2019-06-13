<template>
    <div>
        <!-- data：组件接收的数据 -->
        <!-- show-checkbox:是否显示选择框 -->
        <!-- node-key：类似for循环中的可以 -->
        <!-- default-expand-all ：默认展开全部-->
        <!-- expand-on-click-node=“false” :是否在点击节点的时候展开或者收缩节点-->
        
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
          <!-- {node,data} 相当于const{node,data} =scope-->
          <!-- scope.data:代表每一行的数据对象，scope.node代表着没一行的对象 -->
        <span  class="select">{{ data.title }}</span>
        <span>
            <input :value="data.sort_id" class="box-ins" @blur="handleBlur($event,data)"/>
        </span>
        <span>
          <el-button
            type="text"
            size="mini"
            >
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    </div>
</template>

<script>
import { constants } from 'crypto';
  let id = 1000;

  export default {
    data() {
      const data = [];
      return {
        data: data
      }
    },

    methods: {
          getList(){
            this.$axios({
            url:"http://localhost:8899/admin/category/getlist/goods",
            method:"GET"
        }).then(res=>{
           var {message,status} = res.data
        // console.log(message)
           if(status==0){
               this.data = message
           }
        })
       },
      handleBlur(event,data){
          if(data.sort_id==event.target.value){
              return
          }
          var res = window.confirm("是否确认编辑？")
          if(res){

        
          this.$axios({
              url:'http://localhost:8899/admin/category/edit/'+data.category_id,
              method:"POST",
              data:{
                  ...data,
                  sort_id:event.target.value
              },
              // 处理session跨域
            withCredentials: true
          }).then(res=>{
            //   console.log(res.data)
              const {message,status} = res.data
            if(status===0){
                this.$message.success(message)
                this.getList()
            }
          })
        }
      }
    
    },
    mounted(){
       this.getList()
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .box-ins{
      width: 30px;
  }
  .select{
    width: 100px;
  }
</style>
