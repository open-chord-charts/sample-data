import {compose, createStore} from "redux"
import {persistState} from "redux-devtools"

import rootReducer from "./reducers"
import DevTools from "./containers/DevTools"


const finalCreateStore = compose(
  DevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(getDebugSessionKey()),
)(createStore)


function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  return matches && matches.length > 0 ? matches[1] : null
}


export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(require("./reducers").default)
    })
  }

  return store
}
