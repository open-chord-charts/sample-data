import {Component} from 'react'
import {observer} from 'mobx-react'

import ChordQualitySelect from './ChordQualitySelect'
import DurationInput from './DurationInput'
import NoteSelect from './NoteSelect'

@observer
export default class ChordEditToolbar extends Component {
  handleDuplicateClick = () => {
    const {chart} = this.props
    chart.duplicateSelectedChord()
  }
  handleDurationChange = (duration) => {
    this.props.chart.selectedChord.chord.duration = duration
  }
  handleQualityChange = (quality) => {
    this.props.chart.selectedChord.chord.quality = quality
  }
  handleRemoveClick = () => {
    const {chart} = this.props
    chart.removeSelectedChord()
  }
  handleRootNoteChange = (note) => {
    const {chart} = this.props
    chart.setSelectedChordRootNote(note)
  }
  render () {
    const {chart} = this.props
    return (
      <span>
        <NoteSelect
          onChange={this.handleRootNoteChange}
          title='Root note'
          value={chart.selectedChordRootNote}
        />
        <ChordQualitySelect
          onChange={this.handleQualityChange}
          title='Quality'
          value={chart.selectedChord.chord.quality}
        />
        {' '}
        <DurationInput
          onChange={this.handleDurationChange}
          title='Duration'
          value={chart.selectedChord.chord.duration}
          />
        {' '}
        <button onClick={this.handleRemoveClick}>
          Remove
        </button>
        <button onClick={this.handleDuplicateClick}>
          Duplicate
        </button>
      </span>
    )
  }
}
