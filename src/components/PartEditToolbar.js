import {Component} from 'react'
import {observer} from 'mobx-react'
import r from 'r-dom'

@observer
export default class PartEditToolbar extends Component {
  handleNameChange = (partName) => {
    console.log('TODO', partName)
  }
  handleRemoveClick = () => {
    console.log('TODO')
  }
  render () {
    const {chart} = this.props
    return r('span', [
      r('input', {
        onChange: this.handleNameChange,
        style: {width: '3em'},
        type: 'text',
        value: chart.selectedPartName
      }),
      r('button', {onClick: this.handleRemoveClick}, 'Remove')
    ])
  }
}
