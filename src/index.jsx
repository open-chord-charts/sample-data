import "babel-polyfill"

import {Provider} from "react-redux"
import {render} from "react-dom"

import Bench from "./containers/Bench"
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

const containerElement = document.getElementById("container")
const width = containerElement.offsetWidth

render(
  (
    <Provider store={store}>
      <Bench initialWidth={width} />
    </Provider>
  ),
  containerElement,
)
