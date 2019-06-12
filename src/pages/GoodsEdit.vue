<template>
    <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="所有类型">
            <el-select v-model="form.category_id" placeholder="请选择类型">
                <el-option 
                v-for="(item,index) in categorys"
                :key="index"
                :label="item.title" 
                :value="item.category_id"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否发布">
            <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <!-- 多选项 -->
        <el-form-item label="推荐类型">
            <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
            <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>

        <el-form-item label="内容标题">
            <el-input v-model="form.title" style="width:500px"></el-input>
        </el-form-item>
         <el-form-item label="副标题">
            <el-input v-model="form.sub_title" style="width:300px"></el-input>
        </el-form-item>
        
        <!-- 图片上传 -->
        <el-form-item label="封面图片">
            <!-- show-file-list：是否支持多选 -->
            <!-- on-success 上传成功之后的回调函数 -->
            <!-- before-upload：上传之前的回调函数 -->
            <el-upload
            class="avatar-uploader"
            action="http://localhost:8899/admin/article/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <!-- 图片预览 -->
                <img v-if="imageUrl" :src="imageUrl" class="img-fm avatar">
                <!-- 加载图片 -->
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

         <el-form-item label="商品货号">
            <el-input v-model="form.goods_no" style="width:300px" ></el-input>
        </el-form-item>
         <el-form-item label="库存数量">
            <el-input v-model="form.stock_quantity" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="市场价格">
            <el-input v-model="form.market_price" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="销售价格">
            <el-input v-model="form.sell_price" style="width:300px"></el-input>
        </el-form-item>

        <!-- 多张照片 -->
        <el-form-item label="图片相册">
            <!-- list-style 声明图片显示方式 -->
            <!-- on-preview：预览事件的处理函数 -->
            <!-- on-remove：删除图片事件处理函数 -->
            <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-success="handleCartSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="form.fileList">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" class="img-xc">
            </el-dialog>
        </el-form-item>
           
       
        <el-form-item label="内容摘要">
            <el-input type="textarea" style="width:600px"  v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item>
            <quillEditor/>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>

    </el-form>
</template>


<script>
import { constants } from 'crypto';
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            form: {
            title:"",
            sub_title:"",
            goods_no:"",
            category_id:"",
            stock_quantity:"",
            sell_price:"",
            market_price:"",
            status:false,
            is_top:false,
            is_hot:false,
            zhaiyao:"",
            concent:"",
            imgList:[],
            fileList:[],
            is_slide:false,
            
            },
            id:"",//获取id
            categorys:[],// 所属类别的数组
            imageUrl: '',//预览图片的地址
            dialogImageUrl:"",//多张图片预览的时候图片地址
            dialogVisible:false//弹窗是否显示
        }
    },
    methods: {
        // 单击编辑，更新回去的功能
        onSubmit() {
            // console.log('submit!');
            this.$axios({
                url:"http://localhost:8899/admin/goods/edit/"+this.id,
                method:"POST",
                data:this.form,
                // 处理session跨域
            withCredentials: true
            }).then(res=>{
                const {message,status}=res.data
               if(status===0){
               this.$message.success(message);
              // 返回上一页
                this.$router.back();
            }else{
                // 跳转到登录页
                this.$router.push("/login");
            }
            })
        },
        // 封面照片
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imageUrl)
        // 上传成功的结果给form.imgList赋值
        this.form.imgList=[res]
        // console.log(res)
        },
        // 设置图片上传不能超过2m
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
                return  isLt2M;
        },
        // 多张照片
        handleRemove(file, fileList) {
            console.log(fileList);
            // 把删除后fileList（数组）的response的值返回给this.form.fileList
           this.form.fileList = fileList.map(v=>{
                return v.response
            })
        },
        handlePictureCardPreview(file) {
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCartSuccess(res,file,fileList){
            // 把上传成功的fileList（数组）的response值给this.form.fileList
            this.form.fileList.push(file.response)
            // console.log(fileList)
        }
    },
    mounted(){
        // 页面加载，根据id渲染在编辑页面的数据
        const {id} = this.$route.params
        this.id = id
            this.$axios({
            url: "http://localhost:8899/admin/goods/getgoodsmodel/"+id,
            method: "GET"
            }).then(res => {
                const {status, message} = res.data;
                
     
                // console.log(message)
                message.category_id = +message.category_id
                
                this.form = {
                    ...message,
                    fileList:message.fileList.map(v=>{
                        return {...v,
                                url:`http://localhost:8899/${v.shorturl}`
                            }
                    })
                }
                //   设置封面图片预览
                this.imageUrl=message.imgList[0].url
        })
        
        // 请求数据
         this.$axios({
            url: "http://localhost:8899/admin/category/getlist/goods",
            method: "GET"
        }).then(res => {
            const {status, message} = res.data;
            // 所有的类别数据保存到categorys
            // console.log(message)
            this.categorys = message;
        })
    }
  }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .img-fm,img-xc{
        object-fit: cover;
    }
</style>
