import {Component} from 'react'
import {select, option} from 'react-hyperscript-helpers'

import {QUALIFIERS} from '../constants'

export default class ChordQualitySelect extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }
  render () {
    const {title, value} = this.props
    return select({onChange: this.handleChange, title, value},
      QUALIFIERS.map(key => option({key, value: key}, key))
    )
  }
}
