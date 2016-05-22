import {Component} from 'react'
import {observer} from 'mobx-react'
import r from 'r-dom'

import OneChord from './OneChord'
import TwoChords from './TwoChords'

@observer
export default class ChartCell extends Component {
  handleClick = () => {
    const {chart, chords, partIndex} = this.props
    chart.selectChord(partIndex, chords[0].indexInPart)
  }
  render () {
    const {chart, chords, displayedChords, height, partIndex, width} = this.props
    const isSelected = chart.isEdited && (
      chart.selectedPartIndex === partIndex || (
        chart.selectedChord &&
        chart.selectedChord.indexInPart === chords[0].indexInPart &&
        chart.selectedChord.partIndex === partIndex
      )
    )
    return r(
      'td',
      {
        onClick: this.handleClick,
        style: {
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: isSelected ? 3 : 1,
          minWidth: width,
          padding: 0,
          textAlign: displayedChords === null ? 'center' : null
        }
      },
      displayedChords === null
        ? r('span', {style: {fontSize: height * 0.609}}, '–')
        : r('svg', { height, width },
          displayedChords.length === 1
            ? r(OneChord, {chord: displayedChords[0], height})
            : r(TwoChords, {chord1: displayedChords[0], chord2: displayedChords[1], height, width})
        )
    )
  }
}
