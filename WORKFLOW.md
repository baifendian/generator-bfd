# generator-bfd 工作流


## 项目构建

项目生成器有助于快速产生一个项目的脚手架，同时避免的不同项目间结构的混乱

### 安装 [Node.js](https://nodejs.org/en) (>= v6.3.0)

安装后会集成 npm 包管理工具，为了加快安装速度，设置国内镜像

```sh
npm config set registry https://registry.npm.taobao.org
```

### 安装 yeoman 脚手架构建平台

```sh
# 安装yeoman构建平台
$ npm install -g yo

# 安装百分点项目构建器
$ npm install -g generator-bfd
```

接下来就可以生成一个新项目了，请自定义项目名，如 myapp

```sh
$ cd workspace

$ yo bfd myapp
```

- 如果不定义项目名，则在当前文件夹下生成
- 生成后会自动安装 npm 依赖

文件结构介绍

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

- 主色调修改：组件库和脚手架模版默认色调不适合所有项目，但具体开发无需手写 css 覆盖样式，只需跑个任务（ npm run theme ）即可自动修改，详细颜色替换规则查看 package.json scripts.theme
- 脚手架模版：具体的文件内容可以灵活修改，这里只是定义一种常规的模板，比如登录、权限、左右布局等等，不需要的话直接去掉即可

## 开发

```sh
$ cd myapp

$ npm start
```

到此为止，前端环境配置完成，[http://localhost:9000](http://localhost:9000)

如果有多个项目或者 9000 端口已经被使用，可指定端口，如 4001

```sh
$ npm start -p 4001
```

- 数据接口请允许跨域（CORS）


## 部署测试/上线

### 代码规范检查

代码规范参考 [airbnb](https://github.com/airbnb/javascript)

```sh
$ cd myapp

$ npm run lint
```

### 构建线上环境代码

```sh
$ cd myapp

$ npm run build
```

完成后，myapp 下的 static 目录及 index.html 发送给后台即可，如 Java web 项目下的 webapp 目录

### 修改服务器配置

脚手架采用 browser history 控制 URL，服务器也需要做相应的配置。