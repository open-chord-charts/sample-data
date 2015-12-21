import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import {
  commitChart,
  editChart,
  insertChord,
  redo,
  removeChord,
  removePart,
  setChordAlterations,
  setChordDuration,
  setChordKey,
  undo,
} from "../actions"
import * as helpers from "../helpers"
import * as selectors from "../selectors"
import EditToolbar from "../components/EditToolbar"


const mapStateToProps = (state, ownProps) => {
  const {chartSlug} = ownProps
  const selection = selectors.selectionSelector(chartSlug)(state)
  let selectedChord = null
  let selectedPart = null
  if (selection) {
    switch (selection.type) {
      case "chord":
        const {alterations, degree, duration} = selectors.selectedChordSelector(chartSlug)(state)
        const selectedChordKey = helpers.getKeyFromDegree(degree, state.benchKey)
        selectedChord = {
          ...selection,
          alterations,
          duration,
          key: selectedChordKey,
        }
        break
      case "part":
        const name = selectors.selectedPartNameSelector(chartSlug)(state)
        selectedPart = {
          ...selection,
          name,
        }
        break
    }
  }
  const chart = selectors.chartSelector(chartSlug)(state)
  return {
    gitHubBlobUrl: helpers.getGitHubBlobUrl(chartSlug),
    isEdited: selectors.isEditedSelector(chartSlug)(state),
    redoDisabled: chart.future.length === 0,
    selectedChord,
    selectedPart,
    undoDisabled: chart.past.length === 0,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const chartSlugPartial = (action) => (...args) => action(ownProps.chartSlug, ...args)
  return bindActionCreators(
    {
      commitChart: chartSlugPartial(commitChart),
      editChart: chartSlugPartial(editChart),
      insertChord: chartSlugPartial(insertChord),
      redo: chartSlugPartial(redo),
      removeChord: chartSlugPartial(removeChord),
      removePart: chartSlugPartial(removePart),
      setChordAlterations: chartSlugPartial(setChordAlterations),
      setChordDuration: chartSlugPartial(setChordDuration),
      setChordKey: chartSlugPartial(setChordKey),
      undo: chartSlugPartial(undo),
    },
    dispatch,
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(EditToolbar)
