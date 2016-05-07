import React from 'react'
import { Checkbox } from 'bfd/Checkbox'
import './index.less'

export default React.createClass({

  render() {
    return (
      <div className="function-overview">
        <h1>概览</h1>
        <p>为了防止 css 冲突，className 以 `function-` 开头</p>
        <h3>bfd-ui: Checkbox</h3>
        <Checkbox>全选</Checkbox>
      </div>
    )
  }
})