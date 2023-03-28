<template>
  <div class="box">
    <div class="tit item">GoldStone</div>
    <div class="form-box item">
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules">
        <el-form-item prop="username">
          <el-input
              :prefix-icon="User"
              v-model="form.username"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              :prefix-icon="Lock"
              v-model="form.password"
              show-password
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="submit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="menu item">
      <p>用户注册</p>
      <p>忘记密码？</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Lock, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {FormInstance} from "element-plus";
//data
const formRef = ref<FormInstance>()
const form = reactive({
  username: "",
  password: "",
});
// 表单规则
const phoneValidate = (rule: any, value: any, callback: any) => {
  const myRule = /^(?:(?:\+|00)86)?1\d{10}$/
  if (value === '') callback('请输入手机号')
  else if (!myRule.test(value)) callback('手机号格式错误')
  else callback()
}
const passValidate = (rule: any, value: any, callback: any) => {
  if (value === '') callback('请输入密码')
  else if (value.length < 8 || value.length > 16) callback('密码长度在8-16位之间')
  else callback()
}
const rules = reactive({
  username: [{validator: phoneValidate, trigger: 'blur'}],
  password: [{validator: passValidate, trigger: 'blur'}]
})
//method
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', form)
    } else {
      console.log('error submit!')
      return false
    }
  })
};
</script>

<style scoped lang="scss">
.box {
  $width: 400px;
  $height: 0.75 * $width;
  $menuWidth: $height;
  width: $width;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 40px;
  //边框阴影
  border-radius: 39px;
  background: #1d1e1f;
  box-shadow: 10px 10px 20px #191a1a, -10px -10px 20px #212324;

  .tit {
    height: 50px;
  }

  .form-box {
    $inputHeight: 42px;
    $formHeight: ($inputHeight + 18px) * 3 + 10px;
    height: $formHeight;

    .el-form-item {
      height: $inputHeight;

      .el-input,
      .el-button {
        height: 100%;
        width: 100%;

        :deep(.el-input__wrapper) {
          border-radius: calc($inputHeight / 2);
        }
      }

      :deep(.el-form-item__error) {
        margin-left: calc($inputHeight / 2 + 10px);
      }
    }
  }

  .menu {
    display: flex;
    justify-content: space-around;
    width: $menuWidth;
    margin: 0 auto;

    p {
      color: #646cff;
      cursor: pointer;
      margin: 0 10px;
    }

    p:hover {
      color: #535bf2;
    }
  }
}
</style>
