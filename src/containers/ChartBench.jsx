import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

import {redo, removeChord, selectChord, setChordAlterations, setChordDuration, setChordKey, undo} from "../actions"
import * as selectors from "../selectors"
import ChartBench from "../components/ChartBench"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  return createStructuredSelector({
    isEdited: selectors.isEditedSelector(slug),
    partOfSelectedChordLength: selectors.partOfSelectedChordLengthSelector(slug),
    selection: selectors.selectionSelector(slug),
  })(state)
}


const actions = {
  redo,
  removeChord,
  selectChord,
  setChordAlterations,
  setChordDuration,
  setChordKey,
  undo,
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {isEdited, partOfSelectedChordLength, selection} = stateProps
  const {redo, removeChord, selectChord, setChordAlterations, setChordDuration, setChordKey, undo} = dispatchProps
  const {slug, title, width} = ownProps
  const {index, partName} = selection
  return {
    hotKeysHandlers: isEdited && selection.type === "chord" ?
      {
        // Chord keys
        a: () => setChordKey(slug, partName, index, "A"),
        b: () => setChordKey(slug, partName, index, "B"),
        c: () => setChordKey(slug, partName, index, "C"),
        d: () => setChordKey(slug, partName, index, "D"),
        e: () => setChordKey(slug, partName, index, "E"),
        f: () => setChordKey(slug, partName, index, "F"),
        g: () => setChordKey(slug, partName, index, "G"),

        // Chord alterations
        "-": () => setChordAlterations(slug, partName, index, null),
        m: () => setChordAlterations(slug, partName, index, "m"),
        7: () => setChordAlterations(slug, partName, index, "7"),

        // Edition
        1: () => setChordDuration(slug, partName, index, 1),
        2: () => setChordDuration(slug, partName, index, 2),
        4: () => setChordDuration(slug, partName, index, 4),
        del: () => removeChord(slug, partName, index),

        // Move
        left: () => selectChord(slug, partName, Math.max(0, index - 1)),
        right: () => selectChord(slug, partName, Math.min(index + 1, partOfSelectedChordLength - 1)),

        // Undo/redo
        redo: () => redo(slug),
        undo: () => undo(slug),
      } :
      {},
    slug,
    title,
    width,
  }
}


export default connect(mapStateToProps, actions, mergeProps)(ChartBench)
