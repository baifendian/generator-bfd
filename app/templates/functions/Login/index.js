import './index.less'
import React, { Component } from 'react'
import update from 'react-update'
import { Form, FormItem, FormInput } from 'bfd/Form'
import { Checkbox } from 'bfd/Checkbox'
import Button from 'bfd/Button'
import auth from 'public/auth'
import Footer from 'public/Footer'

class Login extends Component {

  constructor() {
    super()
    this.update = update.bind(this)
    this.rules = {
      username(v) {
        if (!v) return '请输入用户名'
      },
      password(v) {
        if (!v) return '请输入密码'
      }
    }
    this.state = {
      user: {}
    }
  }

  handleSuccess(user) {
    auth.register(user)
    const passState = this.props.location.state
    let referrer = passState && passState.referrer
    this.props.history.push(referrer || '/')
  }

  handleRemember(e) {
    this.update('set', 'user.remember', e.target.checked)
  }

  render() {
    const { isLogin, user } = this.state
    return (
      <div className="login">
        <div className="login__body">
          <Form 
            ref="form" 
            action="auth"
            onSuccess={::this.handleSuccess} 
            defaultData={user} 
            labelWidth={0} 
            rules={this.rules}
          >
            <div className="login__logo">
              <h1>SYSTEM LOGO</h1>
            </div>
            <FormItem name="username">
              <FormInput placeholder="用户名" />
            </FormItem>
            <FormItem name="password">
              <FormInput placeholder="密码" type="password" />
            </FormItem>
            <FormItem name="remember">
              <Checkbox onChange={::this.handleRemember}>下次自动登录</Checkbox>
            </FormItem>
            <Button onClick={() => this.refs.form.save()}>登录</Button>
          </Form>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Login