<template>
    <div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="email"
                label="用户名"
                :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
            >
                <el-input v-model="dynamicValidateForm.email" class="email"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'密码' + index"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
                }"
            >
            <el-input v-model="dynamicValidateForm.email" class="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">注册</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
<style>
    .email{
        width: 250px;
    }
    .password{
        width: 250px;   
    }

</style>
