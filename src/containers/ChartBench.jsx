import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

import {
  commitChart,
  redo,
  removeChord,
  selectChord,
  setChordQualifier,
  setChordDuration,
  setChordRootNote,
  undo,
} from "../actions"
import * as helpers from "../helpers"
import * as selectors from "../selectors"
import ChartBench from "../components/ChartBench"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  return createStructuredSelector({
    chartJson: selectors.chartJsonSelector(slug),
    isEdited: selectors.isEditedSelector(slug),
    partOfSelectedChordLength: selectors.partOfSelectedChordLengthSelector(slug),
    selection: selectors.selectionSelector(slug),
  })(state)
}


const actions = {
  commitChart,
  redo,
  removeChord,
  selectChord,
  setChordQualifier,
  setChordDuration,
  setChordRootNote,
  undo,
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {chartJson, isEdited, partOfSelectedChordLength, selection} = stateProps
  const {slug, title, width} = ownProps
  let hotKeysHandlers = {}
  if (isEdited && selection && selection.type === "chord") {
    const {index, partName} = selection
    hotKeysHandlers = {
      // Chord keys
      a: () => dispatchProps.setChordRootNote(slug, partName, index, "A"),
      b: () => dispatchProps.setChordRootNote(slug, partName, index, "B"),
      c: () => dispatchProps.setChordRootNote(slug, partName, index, "C"),
      d: () => dispatchProps.setChordRootNote(slug, partName, index, "D"),
      e: () => dispatchProps.setChordRootNote(slug, partName, index, "E"),
      f: () => dispatchProps.setChordRootNote(slug, partName, index, "F"),
      g: () => dispatchProps.setChordRootNote(slug, partName, index, "G"),

      // Chord qualifiers
      "-": () => dispatchProps.setChordQualifier(slug, partName, index, null),
      m: () => dispatchProps.setChordQualifier(slug, partName, index, "m"),
      7: () => dispatchProps.setChordQualifier(slug, partName, index, "7"),

      // Edition
      1: () => dispatchProps.setChordDuration(slug, partName, index, 1),
      2: () => dispatchProps.setChordDuration(slug, partName, index, 2),
      4: () => dispatchProps.setChordDuration(slug, partName, index, 4),
      commit: () => dispatchProps.commitChart(slug),
      del: () => dispatchProps.removeChord(slug, partName, index),

      // Move
      left: () => dispatchProps.selectChord(slug, partName, Math.max(0, index - 1)),
      right: () => dispatchProps.selectChord(slug, partName, Math.min(index + 1, partOfSelectedChordLength - 1)),

      // Undo/redo
      redo: () => dispatchProps.redo(slug),
      undo: () => dispatchProps.undo(slug),
    }
  }
  return {
    chartJson,
    chartJsonUrl: helpers.getGitHubBlobUrl(slug),
    hotKeysHandlers,
    slug,
    title,
    width,
  }
}


export default connect(mapStateToProps, actions, mergeProps)(ChartBench)
