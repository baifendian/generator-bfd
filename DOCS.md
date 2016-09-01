# 文档

## 文件结构介绍

```
myapp
|-- bin/               一些工程化辅助脚本
|-- data/              本地模拟数据，baseUrl 统一配置成 '/data'，具体 URL 定义为 xxx.json
|-- functions/         各个页面功能
|-- public/            业务逻辑中可复用的资源（代码、图片等等）
|-- .eslintrc          eslint 代码规范配置
|-- .gitignore        
|-- config.js          全局配置，包括 ajax 全局配置等
|-- index.html         html 入口，打包后自动替换 index.html 入口 js src 地址
|-- index.js           整个应用的入口 
|-- package.json
|-- README.md
|-- router.js          前端路由配置
|-- server.js          开发阶段服务环境，并处理 webpack 编译服务
|-- webpack.config.js  编译、打包配置
```

## 可用的脚本

### `npm start`

进入开发者模式，默认端口 9000，可指定端口 `npm start -p 4001`

### `npm run build`

构建线上模式代码，包括 static 目录和 index.html 文件，发送给后台即可

### `npm run theme`

bfd-ui 及脚手架主色调替换，支持多个颜色替换，语法规则：-#old:#new -#old:#new

### `npm run lint`

代码规范检查，未测试通过禁止上线。代码规范参考 [airbnb](https://github.com/airbnb/javascript)


## 重要说明

### 登录状态控制

用户登录状态的校验是判断 localStorage 和 cookie 是否存在，默认 user 字段，可自行修改（`public/auth.js`），所以登录这块告诉后端同事登录成功后设置一个 cookie 标识即可

另外，使用 localStorage 的主要目的是存放当前登录用户的相关信息，来源于登录接口成功后返回的数据，这样无需每次从服务器获取这些数据

### 部署路径问题

webpack 所有资源的加载都采用绝对路径（），所以 webpack.config 下 publicPath 注意和线上环境保持一致，默认 `/static/` 路径，如 `http://media.com/static/`

### AJAX 全局配置

bfd-ui 中涉及 url 相关的组件内部都使用 `bfd-ui/lib/xhr` 模块来发送 ajax 请求，该模块提供一个全局配置，如基础路径和全局过滤响应等，上线前注意路径问题（`config.js`）

### AJAX 跨域问题

脚手架生成的项目是基于 Node.js 平台的独立的开发环境，一般数据接口都是第三方提供，所以需要第三方接口提供者开通 CORS 跨域功能。

部署上线后（前端代码合并到线上服务器环境）再取消跨域功能即可。