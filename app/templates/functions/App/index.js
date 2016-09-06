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

    let main = [
      <Header key="header" history={history} location={location} />,
      <Body key="body">{children}</Body>
    ]

    if (routes[1]) {
      const path = routes[1].path
      if (path === 'login' || path === '*') {
        main = children
      }
    }

    return (
      <div className="wrapper">
        {main}
        <Footer />
      </div>
    )
  }
}

export default App