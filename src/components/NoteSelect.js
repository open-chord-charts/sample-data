import {Component} from 'react'
import r from 'r-dom'

import {CHROMATIC_NOTES} from '../constants'

export default class NoteSelect extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }
  render () {
    const {title, value} = this.props
    return r('select', { onChange: this.handleChange, title, value },
      CHROMATIC_NOTES.map((key) => r('option', { key, value: key }, key))
    )
  }
}
