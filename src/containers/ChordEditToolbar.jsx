import {connect} from "react-redux"

import {
  insertChord,
  removeChord,
  setChordAlterations,
  setChordDuration,
  setChordKey,
} from "../actions"
import * as helpers from "../helpers"
import * as selectors from "../selectors"
import ChordEditToolbar from "../components/ChordEditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const selection = selectors.selectionSelector(chartSlug)(state)
  // selection.type === "chord" due to ChartEditToolbar
  const selectedChord = selectors.selectedChordSelector(chartSlug)(state)
  const selectedChordKey = helpers.getKeyFromDegree(selectedChord.degree, state.benchKey)
  return {
    selectedChord,
    selectedChordKey,
    selection,
  }
}


const actions = {
  insertChord,
  removeChord,
  setChordAlterations,
  setChordDuration,
  setChordKey,
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {selectedChord, selectedChordKey, selection} = stateProps
  const {index, partName} = selection
  const {alterations, duration} = selectedChord
  const {chartSlug} = ownProps
  return {
    chordAlterations: alterations,
    chordDuration: duration,
    chordKey: selectedChordKey,
    onAlterationsChange: (value) => dispatchProps.setChordAlterations(chartSlug, partName, index, value),
    onDuplicate: () => dispatchProps.insertChord(chartSlug, partName, index),
    onDurationChange: (value) => dispatchProps.setChordDuration(chartSlug, partName, index, value),
    onKeyChange: (value) => dispatchProps.setChordKey(chartSlug, partName, index, value),
    onRemove: () => dispatchProps.removeChord(chartSlug, partName, index),
  }
}


export default connect(mapStateToProps, actions, mergeProps)(ChordEditToolbar)
