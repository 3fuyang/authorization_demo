<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// 鉴权解决方案————JWT(JSON Web Token)
// token
const token = ref(null)
// 用户名
const username = ref('')
// 表单元素
const loginForm = ref(null)
// 校验模式
const usernamePattern = /[^\s]{2}[^\s]*/g
const passwordPattern = /[^\s]{6}[^\s]*/g

// 配置网络请求
onMounted(() => {
  loginForm.value.addEventListener('submit', (e) => {
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    if (usernamePattern.test(formData.username) && passwordPattern.test(formData.password)) {
      axios.post('/api/login', formData)
        .then((res) => {
          // 获取token
          token.value = res.data.token
        })
    }else {
      window.alert('Format error.')
    }
    e.preventDefault()
  })  
})

function requestForUsername() {
  // POST请求的头部需要放在data后，而data不能胜率
  axios.post('/api/userinfo', null,
    { 
      headers:
        // 注意：头部要使用JSON格式
        { 
          'Authorization': `Bearer ${token.value}` 
        } 
    })
    .then((response) => {
      console.log(response)
      username.value = response.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <form
    ref="loginForm"
    class="loginForm"
    name="login">
    <label class="inputLabel">用户名</label>
    <input id="username" type="text" required/>
    <br/><br/>
    <label class="inputLabel">密码</label>
    <input id="password" type="password" required/>
    <br/><br/>
    <input type="submit" value="Log In"/>
  </form>
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
      {{username}}
    </p>
  </div>
</template>

<style scoped>
.loginForm{
  text-align: right;
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