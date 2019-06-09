<template>
<div>
    <el-row type="flex" justify="space-between">
        <div>
              <el-button>新增</el-button>
              <el-button type="danger" @click="handleDeleteMore">删除</el-button>
        </div>
        <div>
             <el-input placeholder="请输入内容" v-model="secrchInput">
                <el-button slot="append" icon="el-icon-search"  @click="handleSecrch"></el-button>
             </el-input>
        </div>
    </el-row>
        <!-- 表格布局 -->
            <!-- 多选表格+自定义模板列表  -->
    <el-table
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
                    <img src="../assets/lyf.jpg" alt="" class="goods-list">
                    <div>
                        {{scope.row.title}}
                    </div>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column
            label="类型"
            prop="categoryname"
            width="120">
        </el-table-column>
            <el-table-column
            label="价格"
            prop="sell_price"
            width="120">
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
        secrchInput:""

      }
    },

methods: {
    getList(){
        this.$axios({
            url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.secrchInput}`,
            method:"GET"
        }).then(res=>{
                this.tableData=res.data.message
                this.total = res.data.totalcount
            })
    },
    // handleSelectionChange是选择每一项的时候触发
    handleSelectionChange(val) {
        this.ids = val
    },
//   编辑页面
    handleEdit(goods){
        console.log(goods)
    },

//   删除多条数据
    handleDeleteMore(){
        const arr = this.ids.map(v=>{
            return v.id
        })
        const ids = arr.join(",")
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${ids}`,
            method:"GET"
        }).then(res=>{
            //   console.log(res.data)
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
    //   删除单条数据
    handleDelete(goods){
        //   console.log(goods)
        var id = goods.id
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${id}`,
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
      
    }
</style>
