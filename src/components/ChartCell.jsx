import {Component} from 'react'
import {observer} from 'mobx-react'

import {CHART_ROW_HEIGHT} from '../constants'
import OneChord from './OneChord'
import TwoChords from './TwoChords'

@observer
export default class ChartCell extends Component {
  handleClick = () => {
    const {chart, chords, partName} = this.props
    chart.selectChord(partName, chords[0].indexInPart)
  }
  render () {
    const {chart, chords, displayedChords, partIndex, partName, width} = this.props
    const isSelected = chart.isEdited && (
      chart.selectedPartIndex === partIndex || (
        chart.selectedChord &&
        chart.selectedChord.indexInPart === chords[0].indexInPart &&
        chart.selectedChord.partName === partName
      )
    )
    return (
      <td
        onClick={this.handleClick}
        style={{
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: isSelected ? 3 : 1,
          minWidth: width,
          padding: 0,
          textAlign: displayedChords === null ? 'center' : null
        }}
      >
        {
          displayedChords === null ? (
            <span style={{fontSize: CHART_ROW_HEIGHT * 0.6}}>–</span>
          ) : (
            <svg height={CHART_ROW_HEIGHT} width={width}>
              {
                displayedChords.length === 1
                  ? <OneChord chord={displayedChords[0]} height={CHART_ROW_HEIGHT} />
                  : <TwoChords chord1={displayedChords[0]} chord2={displayedChords[1]} height={CHART_ROW_HEIGHT} width={width} />
              }
            </svg>
          )
        }
      </td>
    )
  }
}
