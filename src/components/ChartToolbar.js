import {Component} from 'react'
import {observer} from 'mobx-react'
import r from 'r-dom'

import ChordEditToolbar from './ChordEditToolbar'
import PartEditToolbar from './PartEditToolbar'

@observer
export default class ChartToolbar extends Component {
  handleCommitClick = () => {
    this.props.chart.commit()
  }
  handleEditClick = () => {
    this.props.chart.edit()
  }
  render () {
    const {chart} = this.props
    return r(
      'div',
      { style: { marginBottom: 10, marginTop: 10 } },
      chart.isEdited
        ? r(
            'div', [
              r('button', { onClick: this.handleCommitClick, style: { marginRight: 10 } }, 'Commit'),
              chart.selectedChord
                ? r(ChordEditToolbar, { chart: chart })
                : chart.selectedPartIndex !== null && r(PartEditToolbar, { chart: chart })
            ])
        : r('button', { onClick: this.handleEditClick }, 'Edit')
    )
  }
}
