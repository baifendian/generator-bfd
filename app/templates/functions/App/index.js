import 'normalize.css'
import './index.less'
import './pace.less'
import React, { Component, PropTypes } from 'react'
import fastclick from 'fastclick'
import Header from './Header'
import Body from './Body'
import Footer from 'public/Footer'
import pace from './pace'

pace.start()

// 处理移动端点击 300ms 延迟问题
fastclick.attach(document.body)

class App extends Component {
  
  render() {

    const { children, location, history, routes } = this.props

    // login 不渲染 header footer
    if (routes[1] && routes[1].path === 'login') {
      return children
    }
    return (
      <div className="wrapper">
        <Header history={history} location={location} />
        <Body>{children}</Body>
        <Footer />
      </div>
    )
  }
}

export default App