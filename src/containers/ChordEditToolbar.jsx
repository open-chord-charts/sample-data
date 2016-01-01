import {connect} from "react-redux"

import {
  insertChord,
  removeChord,
  setChordQualifier,
  setChordDuration,
  setChordRootNote,
} from "../actions"
import * as helpers from "../helpers"
import * as selectors from "../selectors"
import ChordEditToolbar from "../components/ChordEditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const selection = selectors.selectionSelector(chartSlug)(state)
  // selection.type === "chord" due to ChartEditToolbar
  const selectedChord = selectors.selectedChordSelector(chartSlug)(state)
  const selectedChordRootNote = helpers.getNote(selectedChord.degree, state.benchKey)
  return {
    selectedChord,
    selectedChordRootNote,
    selection,
  }
}


const actions = {
  insertChord,
  removeChord,
  setChordQualifier,
  setChordDuration,
  setChordRootNote,
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {selectedChord, selectedChordRootNote, selection} = stateProps
  const {index, partName} = selection
  const {duration, qualifier} = selectedChord
  const {chartSlug} = ownProps
  return {
    chordDuration: duration,
    chordQualifier: qualifier,
    chordRootNote: selectedChordRootNote,
    onQualifierChange: (value) => dispatchProps.setChordQualifier(chartSlug, partName, index, value),
    onDuplicate: () => dispatchProps.insertChord(chartSlug, partName, index),
    onDurationChange: (value) => dispatchProps.setChordDuration(chartSlug, partName, index, value),
    onKeyChange: (value) => dispatchProps.setChordRootNote(chartSlug, partName, index, value),
    onRemove: () => dispatchProps.removeChord(chartSlug, partName, index),
  }
}


export default connect(mapStateToProps, actions, mergeProps)(ChordEditToolbar)
