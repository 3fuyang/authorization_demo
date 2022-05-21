# authorization_demo

fwio

## 简介

这个Demo用于实验使用JWT(JSON Web Token)的鉴权(Authorization)方法。

前端：Vue 3 + TypeScript + Windi CSS + Naive UI

后端：Express + JSONWebToken

## 思路

1. 前端输入用户名、密码后，点击登录，向后端发送请求。
2. 后端根据用户名生成token后，返回给前端。
3. 前端将token存储在session中。
4. 前端点击"获取用户信息"，将token添加为请求头向后端发送请求。
5. 后端解析请求，若token有效，则将解析出的用户名返回给前端。
6. 前端将返回的信息展示出来。

## 使用方法

打开项目根目录，终端输入命令:

```shell
npm install
npm run dev
```

另开一个终端，输入命令：

```shell
cd server
npm install
ts-node <or nodemon> main.ts
```
