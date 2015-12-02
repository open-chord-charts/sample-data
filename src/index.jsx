import "babel-polyfill"

import {Provider} from "react-redux"
import {render} from "react-dom"

import Bench from "./containers/Bench"
import charts from "./charts-data"
import configureStore from "./store"
import DevTools from "./containers/DevTools"


const appInfo = {
  gitCommitSha: GIT_COMMIT_SHA,
  lastUpdatedOn: LAST_UPDATED_ON,
  packageVersion: PACKAGE_VERSION,
}

const initialState = {
  appInfo,
  charts: charts.map((chart) => ({present: chart})), // The "present" key is for redux-undo.
}

const store = configureStore(initialState)

const containerElement = document.createElement("div")
containerElement.className = "container"
document.body.appendChild(containerElement)

const width = containerElement.offsetWidth

render(
  (
    <Provider store={store}>
      <div>
        <Bench initialWidth={width} />
        <DevTools />
      </div>
    </Provider>
  ),
  containerElement,
)
