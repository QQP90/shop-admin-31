
<template>
  <div class="form-wepper">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { constants } from 'crypto';
export default {
  data() {
    return {
      //  表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单验证规则
      rules: {
        username: [
            { 
                required: true,
                message: "请输入账号",
                 trigger: "blur"
            }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 登录事件，将账号密码提交到服务器
    onSubmit() {
      const data = {
          uname : this.form.username,
          upwd : this.form.password 
      }
      this.$refs.form.validate((valid) => {
        if (valid) {  
            this.$axios({
                url:"http://localhost:8899/admin/account/login",
                method:"POST",
                data,
                withCredentials:true   
            }).then(res=>{
                console.log(res)
                // 解构并且赋值
                const {message,status}=res.data
                if(status==0){
                    this.$router.push("/");
                }
                if(status==1){
                    this.$message.error(message)
                
                }
            })

        }
        });
    }
  }
};
</script>
<style scoped>
.form-wepper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.form {
  width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -250px;
}
</style>
