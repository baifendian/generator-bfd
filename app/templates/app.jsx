import 'bfd-bootstrap'
import './less/app.less'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'bfd-ui/lib/Nav'

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
              <NavItem href="/" icon="equalizer" title="数据概况"></NavItem>
              <NavItem href="/users" icon="send" title="人群管理">
                <NavItem href='/users/list' title="人群列表"></NavItem>
                <NavItem href='/users/task' title="任务管理"></NavItem>
              </NavItem>
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
        </div>
        <div id="footer">
          <div className="pull-right">Copyright©2016 xxx Corporation All Rights Reserved.</div>
        </div>
      </div>
    )
  }
})

render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Overview').default)
        })
      }}/>
      <Route path="users">
        <Route path="list" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/List').default)
          })
        }}/>
        <Route path="task" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Task').default)
          })
        }}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))