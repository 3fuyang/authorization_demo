<script setup lang="ts">
import { computed, ref, h, onMounted } from 'vue'
import axios from 'axios'
import { NForm, NFormItem, FormInst, NInput, NButton, FormRules, useMessage, useNotification, FormItemRule } from 'naive-ui'

const message = useMessage()
const notification = useNotification()

onMounted(() => {
  notification.info({
    content: '用户名:     fwio\n密码:   qwe12345',
  })
})

// 鉴权解决方案————JWT(JSON Web Token)
const token = ref('')
// 用户名
const userinfo = ref('')

// 表单类型与model对象
class LoginForm {
  username: string = ''
  password: string = ''
}
const formData = ref<LoginForm>(new LoginForm())

// 表单ref对象
const formRef = ref<FormInst | null>(null)

// 校验规则
const rules: FormRules = {
  username: [{
    required: true,
    validator: (rule: FormItemRule, value) => {
      if (value !== 'fwio') {
        return new Error('Username: fwio')
      }
    }
  }],
  password: [{
    required: true,
    validator: (rule: FormItemRule, value) => {
      if (value !== 'qwe12345') {
        return new Error('Password: qwe12345')
      }
    }
  }]
}

// 配置网络请求
function login() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      axios.post('/api/login', formData.value)
        .then((res: any) => {
          window.sessionStorage.setItem('token', res.data.token)
          token.value = window.sessionStorage.getItem('token') as string
          notification.create({
            content: `服务端返回的 token 为：\n${res.data.token}`
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      message.error('这都能输错？')
    }
  })
}

function requestForUsername () {
  // POST请求的头部需要放在data后，而data不能省略
  axios.post('/api/userinfo', null,
    { 
      headers:
        // 注意：头部要使用JSON格式
        { 
          'Authorization': `Bearer ${window.sessionStorage.getItem('token')}` 
        } 
    })
    .then((response) => {
      userinfo.value = response.data.data.username
      notification.success({
        content: `用户ID: ${userinfo.value}`
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <div class="border-gray-500 bg-white relative p-4 rounded-md bg-opacity-60">
      <n-form
        class="w-60"
        :rules="rules"
        :model="formData"
        ref="formRef"
        label-placement="left"
        label-align="left">
        <n-form-item
          label="用户名"
          path="username">
          <n-input
            class="!w-40"
            v-model:value="formData.username"
            placeholder="username"/>
        </n-form-item>
        <n-form-item
          label="密码"
          path="password">
          <n-input
            class="!w-40 ml-3.4"
            v-model:value="formData.password"
            type="password"
            show-password-on="mousedown"
            @keyup.enter="login"/>
        </n-form-item>
        <div class="flex justify-evenly items-center">
          <n-button
            type="info"
            @click="login">
            登录
          </n-button>
          <n-button
            type="success"
            v-if="token"
            @click="requestForUsername">
            请求用户信息
          </n-button>
        </div>
      </n-form>      
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply flex flex-col justify-center items-center;
}

.text {
  @apply text-white font-normal max-w-40 break-words mx-2;
}
</style>