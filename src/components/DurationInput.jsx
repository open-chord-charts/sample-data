import {Component} from 'react'

export default class DurationInput extends Component {
  render () {
    const {onChange, title = null, value} = this.props
    return (
      <input
        min={1}
        onChange={(event) => { onChange(event.target.valueAsNumber) }}
        style={{width: '3em'}}
        title={title}
        type='number'
        value={value}
      />
    )
  }
}
