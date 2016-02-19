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
            <span>Logo</span>
          </Link>
        </div>
        <div id="body">
          <div className="sidebar" id="sidebar">
            <Nav>
              <Nav.Item href="/overview" icon="home" title="数据概况">
                <Nav>
                  <Nav.Item href='/overview/trend' title="趋势分析"></Nav.Item>
                  <Nav.Item href='/overview/usage' title="使用分析"></Nav.Item>
                </Nav>
              </Nav.Item>
              <Nav.Item href="/users" icon="bold" title="用户分析"></Nav.Item>
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
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
        cb(null, require('./components/Trend.jsx').default)
      })
    }
  },
  childRoutes: [{
    path: 'overview',
    childRoutes: [{
      path: 'trend',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Trend.jsx').default)
        })
      }
    }, {
      path: 'usage',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/Usage.jsx').default)
        })
      }
    }]
  }, {
    path: 'users',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Users.jsx').default)
      })
    }
  }]
}]

render(<Router history={createHistory()} routes={routeConfig}/>, document.getElementById('app'))