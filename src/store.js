import {compose, createStore} from "redux"

import DevTools from "./containers/DevTools"
import rootReducer from "./reducers"


const finalCreateStore = compose(
  DevTools.instrument(),
)(createStore)


const configureStore = (initialState) => finalCreateStore(rootReducer, initialState)


export default configureStore
