<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

// 鉴权解决方案————JWT(JSON Web Token)
const token = computed(() => sessionStorage.getItem('token'))
// 用户名
const userinfo = ref('')
// 用户名、密码
const username = ref('')
const password = ref('')
// 校验模式
const usernamePattern = /[^\s]{2}[^\s]*/
const passwordPattern = /[^\s]{6}[^\s]*/
// 校验通知
const vertification = ref('')

// 配置网络请求
function login() {
  const formData = {
    username: username.value,
    password: password.value
  }
  console.log(formData)
  if(usernamePattern.test(formData.username) && passwordPattern.test(formData.password)){
    vertification.value = ''
    axios.post('/api/login', formData)
      .then((res) => {
        // 获取并用session存储token
        window.sessionStorage.setItem('token', res.data.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }else {
    vertification.value = '输入格式有误，请重新输入。'
  }
}

function requestForUsername() {
  // POST请求的头部需要放在data后，而data不能胜率
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
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <p class="output">
    Username: fwio ;
    Password: qwe12345<br/>
    {{vertification}}
  </p>
  <div class="flex-box">
    <span class="inputLabel">
      用户名
      <input
        v-model="username"
        type="text"
        required
        @keyup.enter="login"/>    
    </span>
    <span class="inputLabel">
      密码
      <input
        v-model="password"
        type="password"
        required
        @keyup.enter="login"/>
    </span>
    <button @click="login">
      登录
    </button>
  </div>
  <p class="output">
    服务端返回的token为：
  </p>
  <p class="output">
    {{token}}
  </p>
  <div class="infoBox" v-if="token">
    <button class="button" @click="requestForUsername">
      获取用户信息
    </button>
    <p class="output">
      {{userinfo}}
    </p>
  </div>
</template>

<style scoped>
.flex-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.inputLabel{
  color: white;
}
.output{
  color: white;
  font-weight: 600;
  max-width: 40%;
  word-wrap: break-word;
  margin: .5em 0;
}
.output + .output{
  margin-top: 0;
}
.infoBox{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button{
  outline: none;
  background-color: white;
  color: black;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
}
</style>