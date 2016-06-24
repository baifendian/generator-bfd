## yeoman 平台百分点项目生成器

详细使用说明查看 [http://ui.baifendian.com/workflow](http://ui.baifendian.com/workflow) 项目构建部分


## Changelog

### v0.2.1

2016-06-24

1. 修复开发、线上环境识别错误的问题
1. 取消 build 命令的 -- jsp 参数，直接 `npm run build` 即可，具体的模版后缀直接修改 webpack.config.js，模板语法单独在 index.tpl 里设置
1. 修正 index.tpl 默认 jsp 模版语法
1. 注释 App.jsx 权限验证逻辑，根据需求自行添加


### v0.2.0 

2016-06-16

1. 添加自动化换肤功能，bin/theme.js，`npm run theme` 执行
1. 线上、开发环境配置抽离，src/env.js
1. 添加了 README.md 模版
1. 添加 livereload 插件，文件改变后浏览器自动刷新