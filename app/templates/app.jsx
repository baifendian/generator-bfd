import 'bfd-bootstrap'
import './less/app.less'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import Nav from 'bfd-ui/lib/nav'

const App = React.createClass({

  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <Link to="/" className="logo">
            <span>XXX系统</span>
          </Link>
          <div className="pull-right">
            欢迎您，demo &nbsp;|&nbsp;
            <a href="">安全退出</a>
          </div>
        </div>
        <div id="body" className="clearfix">
          <div className="sidebar" id="sidebar">
            <Nav>
              <Nav.Item href="/" icon="home" title="数据概况"></Nav.Item>
              <Nav.Item href="/users" icon="home" title="人群管理">
                <Nav>
                  <Nav.Item href='/users/list' title="人群列表"></Nav.Item>
                  <Nav.Item href='/users/task' title="任务管理"></Nav.Item>
                </Nav>
              </Nav.Item>
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
        </div>
        <div id="footer">
          <div className="pull-right">Copyright©2015 xxx Corporation All Rights Reserved.</div>
        </div>
      </div>
    )
  }
})

const routeConfig = [{
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Overview.jsx').default)
      })
    }
  },
  childRoutes: [{
    path: 'overview',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Overview.jsx').default)
      })
    }
  }, {
    path: 'users',
    childRoutes: [{
      path: 'list',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/List.jsx').default)
        })
      }
    }, {
      path: 'task',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Task.jsx').default)
        })
      }
    }]
  }]
}]

render(<Router history={createHistory()} routes={routeConfig}/>, document.getElementById('app'))