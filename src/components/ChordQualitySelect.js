import {Component} from 'react'
import r from 'r-dom'

import {QUALIFIERS} from '../constants'

export default class ChordQualitySelect extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }
  render () {
    const {title, value} = this.props
    return r('select', {onChange: this.handleChange, title, value},
      QUALIFIERS.map(key => r('option', {key, value: key}, key))
    )
  }
}
