<template>
  <div class="box">
    <div class="tit item">GoldStone</div>
    <div class="form-box item">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item class="username" prop="username">
          <el-input
            :prefix-icon="User"
            v-model="form.username"
            placeholder="请输入手机号"
          ></el-input>
          <el-button @click="sendCode"> 发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="form.password2"
            show-password
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Key"
            v-model="form.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="submit(formRef)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Key, Lock, User } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";
import service from "@/requset";
import { showToast } from "@nutui/nutui";
import router from "@/router";
//data
const formRef = ref<FormInstance>();
const form = reactive({
  username: "",
  password: "",
  password2: "",
  code: "",
});
// 表单规则
const phoneValidate = (rule: any, value: any, callback: any) => {
  const myRule = /^(?:(?:\+|00)86)?1\d{10}$/;
  if (value === "") callback("请输入手机号");
  else if (!myRule.test(value)) callback("手机号格式错误");
  else callback();
};
const passValidate = (rule: any, value: any, callback: any) => {
  if (value === "") callback("请输入密码");
  else if (value.length < 8 || value.length > 16)
    callback("密码长度在8-16位之间");
  else callback();
};
const rules = reactive({
  username: [{ validator: phoneValidate, trigger: "blur" }],
  password: [{ validator: passValidate, trigger: "blur" }],
  password2: [{ validator: passValidate, trigger: "blur" }],
});
//method
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      service
        .post("/user/register", {
          username: form.username,
          password: form.password,
          code: form.code,
        })
        .then((res) => {
          showToast.text(res.data.msg);
          if (res.data.code === 200) {
            router.push({ name: "login" });
          }
          console.log(res);
        });
      console.log("submit!", form);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const sendCode = () => {
  service.post("/user/code", { phone: form.username });
};
</script>

<style scoped lang="scss">
.box {
  $width: 360px;
  $height: 0.75 * $width;
  $menuWidth: $height;
  $bg-color: #ffffff;
  $bg-border-color: #212324;
  width: $width;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 40px;
  margin: 0 auto;
  //边框阴影
  border-radius: 39px;
  background: $bg-color;
  box-shadow: 10px 10px 20px $bg-color, -10px -10px 20px $bg-border-color;
  transform: translateY(40%);

  .tit {
    height: 50px;
  }

  .form-box {
    $inputHeight: 42px;
    $formHeight: ($inputHeight + 18px) * 5 + 10px;
    height: $formHeight;

    .username {
      :deep(.el-form-item__content) {
        display: flex;

        .el-input {
          flex: 1;
          width: auto;
        }

        .el-button {
          width: 80px;
          border-radius: 21px;
          margin-left: 10px;
        }
      }
    }

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
