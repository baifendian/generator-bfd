import React from 'react'
import { render } from 'react-dom'

const AA = React.createClass({

  test() {
    console.log('click')
  },

  componentDidMount() {
    window.addEventListener('click', this.test)  
  },

  componentWillUnmount() {
    window.removeEventListener('click', this.test)
  },

  render() {
    return (
      <div>aa</div>
    )
  }
})

export default React.createClass({

  componentDidMount() {
    this.refs.container.innerHTML = '<div id="test"></div>'
    render(<AA></AA>, document.getElementById('test'))
  },

  render() {
    return (
      <div className="usage" ref="container"></div>
    )
  }
})