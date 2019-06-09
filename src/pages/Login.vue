<template>
  <div class="form-wepper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { constants } from "crypto";
import { stat } from "fs";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      // 表单验证
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      const data = {
        uname: this.form.username,
        upwd: this.form.password
      };
      // 如果表单不通过，不能发送数据
      this.$refs.form.validate(valid => {
        if (valid) {
          // 向后端发送数据
          // 调用axios
          this.$axios({
            // 请求的地址
            url: "http://localhost:8899/admin/account/login",
            method: "POST",
            data,
            // 处理session跨域
            withCredentials: true
          }).then(res => {
            console.log(res);
            var { message, status } = res.data;
            // 登陆成功
            if (status === 0) {
              this.$router.push("/");
            }
            // 登录失败
            if (status === 1) {
              this.$message.error(message);
            }
          });
        }
      });
    }
  }
};
</script>
<style>
.form-wepper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -95px;
}
</style>
