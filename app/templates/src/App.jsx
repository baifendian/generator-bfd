import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, NavItem } from 'bfd/Nav'
import xhr from 'bfd/xhr'
import auth from 'public/auth'
import env from './env'
import './App.less'

const LOGIN_PATH = (env.basePath + '/login').replace(/\/\//, '/')

const App = React.createClass({

  contextTypes: {
    history: PropTypes.object
  },

  getInitialState() {
    return {
      // 用户是否登录
      loggedIn: auth.isLoggedIn()
    }
  },

  componentWillMount() {
    // 页面加载后判断是否需要跳转到登录页
    if (!this.state.loggedIn && !this.isInLogin()) {
      this.login()
    }
  },

  componentWillReceiveProps() {
    this.setState({
      loggedIn: auth.isLoggedIn()
    })
  },

  // 当前 URL 是否处于登录页
  isInLogin() {
    return this.props.location.pathname === LOGIN_PATH
  },

  // 权限判断
  hasPermission() {
    // ...根据业务具体判断
    return true 
  },

  // 跳转到登录页
  login() {
    this.context.history.replaceState({
      referrer: this.props.location.pathname
    }, LOGIN_PATH)
  },

  // 安全退出
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

    let Children = this.props.children

    // 当前 URL 属于登录页时，不管是否登录，直接渲染登录页
    if (this.isInLogin()) return Children

    if (this.state.loggedIn) {

      if (!this.hasPermission()) {
        Children = <div>您无权访问该页面</div>
      }

      return (
        <div id="wrapper" className="container-fluid">
          <div id="header" className="row">
            <Link to={env.basePath} className="logo">
              <span>PROJECT NAME</span>
            </Link>
            <div className="pull-right">
              欢迎您，{auth.user.name} &nbsp;|&nbsp;
              <a href="" onClick={this.handleLogout}>安全退出</a>
            </div>
          </div>
          <div id="body" className="row">
            <div className="sidebar col-md-2 col-sm-3">
              <Nav href={env.basePath}>
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
      return null
    }
  }
})

export default App