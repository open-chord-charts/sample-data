import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {selectChord, setChordKey} from "../actions"
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
  selectChord,
  setChordKey,
}, dispatch)

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const dispatchSetChordKeyIfEdited = (chordKey) => {
    const {isEdited, selection} = stateProps
    if (isEdited && selection.type === "chord") {
      dispatchProps.setChordKey(ownProps.slug, selection.partName, selection.index, chordKey)
    }
  }
  const dispatchMoveIfEdited = (direction) => {
    // direction must be "left" or "right"
    const {isEdited, partOfSelectedChordLength, selection} = stateProps
    if (isEdited && selection.type === "chord") {
      const newIndex = direction === "left" ?
        Math.max(0, selection.index - 1) :
        Math.min(selection.index + 1, partOfSelectedChordLength - 1)
      dispatchProps.selectChord(ownProps.slug, selection.partName, newIndex)
    }
  }
  return {
    chordA: () => dispatchSetChordKeyIfEdited("A"),
    chordB: () => dispatchSetChordKeyIfEdited("B"),
    chordC: () => dispatchSetChordKeyIfEdited("C"),
    chordD: () => dispatchSetChordKeyIfEdited("D"),
    chordE: () => dispatchSetChordKeyIfEdited("E"),
    chordF: () => dispatchSetChordKeyIfEdited("F"),
    chordG: () => dispatchSetChordKeyIfEdited("G"),
    moveLeft: () => dispatchMoveIfEdited("left"),
    moveRight: () => dispatchMoveIfEdited("right"),
    slug: ownProps.slug,
    title: ownProps.title,
    width: ownProps.width,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChartBench)
