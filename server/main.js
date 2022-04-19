const express = require('express')
const app = express()

// jwt用于生成JWT字符串
const jwt = require('jsonwebtoken')
// express-jwt用于解析JWT字符串，将其还原成JSON对象
const expressJWT = require('express-jwt')

const secretKey = 'CentOS'

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(expressJWT({ 
    secret: secretKey,
    algorithms: ['HS256']
   }).unless({ path: [/^\/login/] }))
  // 全局的错误处理
  .use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
      res.send({
        status: 401,
        message: '无效的token'
      })
    }else {
      res.send({
        status: 402,
        message: '未知错误'
      })
    }
  })

// 用户登录
app.post('/login', (req, res) => {
  const data = req.body
  if (data.username === 'fwio' && data.password === 'qwe12345'){
    const tokenStr = jwt.sign({ username: data.username}, secretKey, {
      expiresIn: '120s'
    })
    res.send({
      status: 200,
      message: '登录成功！',
      token: tokenStr
    })
  }else{
    res.send({
      status: 400,
      message: '用户名或密码错误！'
    })
  }
})

// 接收客户端的token，进行解析并返回原加密字段（用户名）
app.post('/userinfo', (req, res) => {
  console.log(req.username)
  res.send({
    status: 200,
    message: '获取用户信息成功',
    value: req.username
  })
})

const server = app.listen('3001', () => {
  console.log('Server is running at %s:%s', server.address().address, server.address().port)  
})