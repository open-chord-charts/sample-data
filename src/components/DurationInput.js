import {Component} from 'react'
import r from 'r-dom'

export default class DurationInput extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.valueAsNumber)
  }
  render () {
    const {title, value} = this.props
    return r('input', {
      min: 1,
      onChange: this.handleChange,
      style: { width: '3em' },
      title,
      type: 'number',
      value
    })
  }
}
