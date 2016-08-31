import './index.less'
import React from 'react'
import { Row, Col } from 'bfd/Layout'

const Footer = () => {
  return (
    <Row className="footer">
      <Col col="sm-6">
        <a href="http://www.baifendian.com" className="footer__logo">
          <img src={require('public/bfd.png')} />
        </a>
        <a href="http://www.baifendian.com/aboutus/">公司简介</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="http://www.baifendian.com/contact/">联系我们</a>
      </Col>
      <Col right>
        Copyright©2016 Baifendian Corporation All Rights Reserved
      </Col>
    </Row>
  )
}

export default Footer