import {Component} from 'react'

import {CHROMATIC_NOTES} from '../constants'

export default class NoteSelect extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }
  render () {
    const {title, value} = this.props
    return (
      <select
        onChange={this.handleChange}
        title={title}
        value={value}
      >
        {
          CHROMATIC_NOTES.map((key, idx) => (
            <option key={idx} value={key}>{key}</option>
          ))
        }
      </select>
    )
  }
}
