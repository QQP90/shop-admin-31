<template>
<div>
    <el-row type="flex" justify="space-between">
        <div>
              <el-button @click="handleGoodsAdd">新增</el-button>
              <el-button type="danger" @click="handleDeleteMore">删除</el-button>
        </div>
        <div>
             <el-input placeholder="请输入内容" v-model="secrchValue">
                <el-button slot="append" icon="el-icon-search"  @click="handleSecrch"></el-button>
             </el-input>
        </div>
    </el-row>
        <!-- 表格布局 -->
            <!-- 多选表格+自定义模板列表  -->
    <el-row type="flex" justify="space-between">
         <el-table
            class="goods-felx"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:20px"
            @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="标题"
            width="300">
            <!-- slot-scope代表每一项的数据对象 -->
            <template slot-scope="scope">
                <el-row type="flex" align="middle">
                    <img :src="scope.row.imgurl" alt="" class="goods-list">
                    <div>
                        {{scope.row.title}}
                    </div>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column
            label="类型"
            prop="categoryname"
            width="300">
        </el-table-column>
            <el-table-column
            label="价格"
            prop="sell_price"
            width="300">
        </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    @click="handleEdit( scope.row)">编辑</el-button>
                    <el-button
                    type="danger"
                    @click="handleDelete( scope.row)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    </el-row>
   
    <!-- 分页
        size-change:显示条数切换
        current-change：页数切换
        current-page：当前页数
        page-sizes:条数的选项 
        page-size：当前的条数
        layout:默认布局
        total:数据全部条数
        -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
</div>
</template>

<script>
import { constants } from 'crypto';
export default {
data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:5,
        total:0,
        ids:[],
        secrchValue:""

      }
    },

methods: {
    // 发送请求的函数
    getList(){
        this.$axios({
            url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.secrchValue}`,
            method:"GET"
        }).then(res=>{
                // console.log(res.data)
                this.tableData=res.data.message
                this.total = res.data.totalcount
            })
    },
    // 删除函数的封装
    deleteGoods(ID){
         this.$axios({
            url:`http://localhost:8899/admin/goods/del/${ID}`,
            method:"GET"
        }).then(res=>{
                const {message , status} = res.data
                if(status===0){
                    this.$message.success("删除成功")
                    // 请求列表数据
                    this.getList()
                }
                if(status===1){
                    this.$message.error(message)    
                }
            })
    },
    // handleSelectionChange是选择每一项的时候触发
    handleSelectionChange(val) {
        this.ids = val
    },
//   编辑页面
    handleEdit(goods){
        // console.log(goods)
        this.$router.push("/admin/goods-edit/"+goods.id)
    },

//   删除多条数据
    handleDeleteMore(){
        const arr = this.ids.map(v=>{
            return v.id
        })
        const ids = arr.join(",")
        this.deleteGoods(ids)
    },
    //   删除单条数据
    handleDelete(goods){
        //   console.log(goods)
        var id = goods.id
        this.deleteGoods(id)
    },


//   分页
// 条数的切换
    handleSizeChange(val) {
        this.pageSize = val
        this.getList()
    },
//   页面的切换
    handleCurrentChange(val) {
        this.pageIndex = val
        this.getList()
    },
    handleSecrch(){
        this.getList()
    },
    handleGoodsAdd(){
        this.$router.push("/admin/goods-add")
    }
},
mounted(){
    this.getList()
 }

}
</script>

<style>
    .goods-list{ 
        flex-shrink: 0;
        width: 60px;
        height: 40px;
        object-fit: cover;
    }
  /* .goods-felx{
      display: flex;
      justify-content: space-between
  } */
</style>
