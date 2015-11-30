import {combineReducers} from "redux"

import chartsData from "./charts-data"
import {SET_SELECTED_KEY} from "./constants"


// Constants set by webpack DefinePlugin.

const appInfoInitialState = {
  gitCommitSha: GIT_COMMIT_SHA,
  lastUpdatedOn: LAST_UPDATED_ON,
  packageVersion: PACKAGE_VERSION,
}

const appInfo = (state = appInfoInitialState) => {
  return state
}


const charts = (state = chartsData, action) => {
  return state
}


const selectedKey = (state = "C", action) => {
  switch(action.type) {
    case SET_SELECTED_KEY:
      return action.selectedKey
    default:
      return state
  }
}


const rootReducer = combineReducers({
  appInfo,
  charts,
  selectedKey,
})


export default rootReducer
