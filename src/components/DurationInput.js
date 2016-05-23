import {Component} from 'react'
import {input} from 'react-hyperscript-helpers'

export default class DurationInput extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.valueAsNumber)
  }
  render () {
    const {title, value} = this.props
    return input({
      min: 1,
      onChange: this.handleChange,
      style: {width: '3em'},
      title,
      type: 'number',
      value
    })
  }
}
