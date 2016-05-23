import {Component} from 'react'
import {observer} from 'mobx-react'
import {button, input, span} from 'react-hyperscript-helpers'

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
    return span([
      input({
        onChange: this.handleNameChange,
        style: {width: '3em'},
        type: 'text',
        value: chart.selectedPartName
      }),
      button({onClick: this.handleRemoveClick}, 'Remove')
    ])
  }
}
