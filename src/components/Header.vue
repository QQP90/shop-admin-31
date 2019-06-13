<template>
<div class="header">
     <el-row type="flex" justify="space-between">
        <div class="arrow" @click="handleClick">
            <i class="el-icon-back"></i>
        </div>
        <div>
            {{user.uname}} {{user.realname}} 
            <span class="exit" @click="handleExit">
                退出
            </span>
        </div>
    </el-row>
</div>
   
</template>

<script>
export default {
    methods:{
        handleClick(){
            this.$emit("click")
        },
        handleExit(){
            this.$axios({
                url:"http://localhost:8899/admin/account/logout",
                method:"GET",
                //session跨域
                withCredentials: true
            }).then(res=>{
                const {message,status} = res.data
                if(status==0){
                    this.$message.success(message)
                    localStorage.removeItem("user")
                    this.$router.push("/login")
                }
                if(status==1){
                    this.$message.error(message);
                    
                }
            })
           
        }
    },
    data(){
        return {
            user:{}
        }
    },
    mounted(){
        // 通过组件的`$store`属性读取仓库中的数据
        this.user=this.$store.state.user
        // console.log(this.user);
    }
}
</script>

<style>
    .arrow,.exit{
        cursor: pointer;
    }

</style>
