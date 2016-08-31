/**
 * 常见的左右布局，左侧导航，右侧内容，并做了响应式处理
 */

import './index.less'
import React, { Component } from 'react'
import classnames from 'classnames'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import Button from 'bfd/Button'

class Body extends Component {

  constructor() {
    super()
    this.state = {
      // 响应式侧边导航菜单，小屏幕下侧边栏关闭
      open: false
    }
  }

  close() {
    this.setState({open: false})
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleNavItemClick() {
    this.close()
  }

  handleContentClick() {
    this.state.open && this.close()
  }

  render() {
    const { children } = this.props
    const { open } = this.state
    return (
      <Row className={classnames('body', {'body--open': open})} fluid>
        <Col className="body__sidebar">
          <Nav href="/" onItemClick={::this.handleNavItemClick}>
            <NavItem href="overview" icon="th" title="概览" defaultOpen>
              <NavItem href="overview/todos" title="待办事项" />
            </NavItem>
          </Nav>
        </Col>
        <Col className="body__content" onClick={::this.handleContentClick}>
          <Button
            icon="bars" 
            className="body__bar-toggle" 
            onClick={::this.handleToggle}
          />
          {children}
        </Col>
      </Row>
    )
  }
}

export default Body