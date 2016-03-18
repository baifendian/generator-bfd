import React from 'react'
import DatePicker from 'bfd-ui/lib/DatePicker'
import LineChart from 'bfd-ui/lib/lineChart'
import '../less/overview.less'

export default React.createClass({

  getInitialState() {
    return {
      url: '/data/test.json'     
    }
  },

  handleSelect(date) {
    this.setState({url: '/data/test.json?date=' + date})
  },

  render() {
    return (
      <div className="overview">
        <div className="panel panel-default trend">
          <div className="panel-heading">
            <DatePicker onSelect={this.handleSelect}></DatePicker>
          </div>
          <div className="panel-body row">
            <div className="col-md-6">
              <LineChart cols={{x:'用户数',y:'销量'}} category="date" url={this.state.url}></LineChart>
            </div>
            <div className="col-md-6">
              <h1>折线图</h1>
              <p>排列在工作表的列或行中的数据可以绘制到折线图中。折线图可以显示随时间（根据常用比例设置）而变化的连续数据，因此非常适用于显示在相等时间间隔下数据的趋势。在折线图中，类别数据沿水平轴均匀分布，所有值数据沿垂直轴均匀分布。</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})