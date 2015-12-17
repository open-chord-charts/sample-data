import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {redo, removeChord, selectChord, setChordAlterations, setChordDuration, setChordKey, undo} from "../actions"
import * as selectors from "../selectors"
import ChartBench from "../components/ChartBench"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps
  const chart = selectors.selectChart(state, slug)
  const {isEdited, selection} = chart
  const partOfSelectedChordLength = isEdited && selection.type === "chord" ?
    selectors.selectPart(state, slug, selection.partName).length :
    null
  return {
    isEdited,
    partOfSelectedChordLength,
    selection,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  redo,
  removeChord,
  selectChord,
  setChordAlterations,
  setChordDuration,
  setChordKey,
  undo,
}, dispatch)

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {isEdited, selection} = stateProps
  const {slug} = ownProps
  return {
    hotKeysHandlers: isEdited && selection.type === "chord" ?
      {
        "-": () => dispatchProps.setChordAlterations(slug, selection.partName, selection.index, null),
        1: () => dispatchProps.setChordDuration(slug, selection.partName, selection.index, 1),
        2: () => dispatchProps.setChordDuration(slug, selection.partName, selection.index, 2),
        4: () => dispatchProps.setChordDuration(slug, selection.partName, selection.index, 4),
        7: () => dispatchProps.setChordAlterations(slug, selection.partName, selection.index, "7"),
        a: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "A"),
        b: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "B"),
        c: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "C"),
        d: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "D"),
        del: () => dispatchProps.removeChord(slug, selection.partName, selection.index),
        e: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "E"),
        f: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "F"),
        g: () => dispatchProps.setChordKey(slug, selection.partName, selection.index, "G"),
        left: () => dispatchProps.selectChord(slug, selection.partName, Math.max(0, selection.index - 1)),
        m: () => dispatchProps.setChordAlterations(slug, selection.partName, selection.index, "m"),
        right: () => dispatchProps.selectChord(
          slug,
          selection.partName,
          Math.min(selection.index + 1, stateProps.partOfSelectedChordLength - 1),
        ),
        redo: () => dispatchProps.redo(slug),
        undo: () => dispatchProps.undo(slug),
      } :
      {},
    slug,
    title: ownProps.title,
    width: ownProps.width,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChartBench)
