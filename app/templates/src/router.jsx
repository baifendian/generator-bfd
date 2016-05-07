/**
 * 前端路由配置，也是所有页面的入口。
 * 注意：require.ensure 实现代码按页面分割，动态加载，详细参考 webpack 文档
 */

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import App from './App'

export default render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Overview').default)
        })
      }}/>
      <Route path="data">
        <Route path="moduleA" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Data/ModuleA').default)
          })
        }}/>
        <Route path="moduleB" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Data/ModuleB').default)
          })
        }}/>
      </Route>
      <Route path="login" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Login').default)
        })
      }}/>
      <Route path="*" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/NotFound').default)
        })
      }}/>
    </Route>
  </Router>
), document.getElementById('app'))