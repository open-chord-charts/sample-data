import {compose, createStore} from "redux"
import {persistState} from "redux-devtools"

import DevTools from "./containers/DevTools"
import rootReducer from "./reducers"


const finalCreateStore = compose(
  DevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)


const configureStore = (initialState) => finalCreateStore(rootReducer, initialState)


export default configureStore
