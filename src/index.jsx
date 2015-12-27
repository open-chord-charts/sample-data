import "babel-polyfill"

import {render} from "react-dom"

import Root from "./containers/Root"
import charts from "./charts-data"
import configureStore from "./store"


const appInfo = {
  gitCommitSha: GIT_COMMIT_SHA,
  lastUpdatedOn: LAST_UPDATED_ON,
  packageVersion: PACKAGE_VERSION,
}

const initialState = {
  appInfo,
  charts: charts.reduce(
    (nextCharts, chart) => {
      nextCharts[chart.slug] = {present: chart}
      return nextCharts
    },
    {}
  ), // The "present" key is for redux-undo.
}

const store = configureStore(initialState)

const rootElement = document.getElementById("root")
const width = rootElement.offsetWidth


render(<Root store={store} width={width} />, rootElement)
