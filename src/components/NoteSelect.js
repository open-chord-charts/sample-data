import {Component} from 'react'
import {select, option} from 'react-hyperscript-helpers'

import {CHROMATIC_NOTES} from '../constants'

export default class NoteSelect extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }
  render () {
    const {title, value} = this.props
    return select({onChange: this.handleChange, title, value},
      CHROMATIC_NOTES.map((key) => option({key, value: key}, key))
    )
  }
}
