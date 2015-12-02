import {compose, createStore} from "redux"
import {persistState} from "redux-devtools"

import {rootReducer} from "./reducers"
import DevTools from "./containers/DevTools"


const finalCreateStore = compose(
  DevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)


const configureStore = (initialState) => finalCreateStore(rootReducer, initialState)


export default configureStore
