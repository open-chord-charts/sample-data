import {Component} from 'react'

import {QUALIFIERS} from '../constants'

export default class ChordQualitySelect extends Component {
  render () {
    const {onChange, title = null, value} = this.props
    return (
      <select
        onChange={(event) => { onChange(event.target.value) }}
        title={title}
        value={value}
      >
        {
          QUALIFIERS.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))
        }
      </select>
    )
  }
}
