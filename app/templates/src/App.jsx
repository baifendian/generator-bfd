import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, NavItem } from 'bfd/Nav'
import xhr from 'bfd/xhr'
import auth from 'public/auth'
import './App.less'

const LOGIN_PATH = '/login'

const App = React.createClass({

  contextTypes: {
    history: PropTypes.object
  },

  getInitialState() {
    return {
      loggedIn: auth.isLoggedIn()
    }
  },

  componentWillMount() {
    this.protectedPaths = ['data']
    if (!this.state.loggedIn && this.props.location.pathname !== LOGIN_PATH) {
      this.login()
    }
  },

  componentWillReceiveProps() {
    this.setState({
      loggedIn: auth.isLoggedIn()
    })
  },

  login() {
    this.context.history.replaceState({
      referrer: this.props.location.pathname
    }, LOGIN_PATH)
  },

  handleLogout(e) {
    e.preventDefault()
    xhr({
      url: 'logout',
      success: () => {
        auth.destroy()
        this.login()
      }
    })
  },

  render() {
    if (this.state.loggedIn) {
      if (this.props.location.pathname === LOGIN_PATH) {
        return this.props.children
      }

      // 权限处理逻辑，如果需要的话
      let Children = this.props.children
      if (auth.user.type === 0 && this.protectedPaths.indexOf(this.props.routes[1].path) !== -1) {
        Children = <div>您无权访问该页面</div>
      }
      return (
        <div id="wrapper" className="container-fluid">
          <div id="header" className="row">
            <Link to="/" className="logo">
              <span>PROJECT NAME</span>
            </Link>
            <div className="pull-right">
              欢迎您，{auth.user.name} &nbsp;|&nbsp;
              <a href="" onClick={this.handleLogout}>安全退出</a>
            </div>
          </div>
          <div id="body" className="row">
            <div className="sidebar col-md-2 col-sm-3">
              <Nav href="/">
                <NavItem icon="equalizer" title="概览" />
                {auth.user.type > 0 ? [
                  <NavItem key={0} href="data" icon="hand-right" title="数据统计">
                    <NavItem href="data/moduleA" title="模块A" />
                    <NavItem href="data/moduleB" title="模块B" />
                  </NavItem>
                ] : null}
              </Nav>
            </div>
            <div className="content col-md-10 col-sm-9">{Children}</div>
          </div>
          <div id="footer">
            <div className="pull-left">
              <a href="http://www.baifendian.com" className="logo">
                <img src={require('public/bfd.png')} />
              </a>
              <a href="http://www.baifendian.com/list.php?catid=32">公司简介</a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="http://www.baifendian.com/list.php?catid=43">联系我们</a>
            </div>
            <div className="pull-right">Copyright©2016 Baifendian Corporation All Rights Reserved.&nbsp;&nbsp;|&nbsp;&nbsp;京ICP备09109727号&nbsp;&nbsp;|&nbsp;&nbsp;京公网安备11010802010283号</div>
          </div>
        </div>
      )
    } else {
      if (this.props.location.pathname === LOGIN_PATH) {
        return this.props.children
      }
      return null
    }
  }
})

export default App