import React from 'react'
import LineChart from 'bfd-ui/lib/lineChart'
import fetch from '../fetch'
import '../less/overview.less'

export default React.createClass({

  getInitialState() {
    return {
      url: '/data/test.json'     
    }
  },

  handleChange(e) {
    this.setState({url: '/data/test.json?type=' + e.target.value})
  },

  render() {
    return (
      <div className="overview">
        <div className="panel panel-default trend">
          <div className="panel-heading">
            <select onChange={this.handleChange}>
              <option value="0">昨天</option>
              <option value="1">最近7天</option>
              <option value="2">最近30天</option>
            </select>
          </div>
          <div className="panel-body">
            <LineChart cols={{x:'用户数',y:'销量'}} category="date" url={this.state.url}></LineChart>
          </div>
        </div>
      </div>
    )
  }
})