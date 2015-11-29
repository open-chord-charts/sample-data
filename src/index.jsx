import "babel-polyfill"

import {createStore} from "redux"
import {Provider} from "react-redux"
import {render} from "react-dom"

import App from "./containers/App"
import todoApp from "./reducers"


const store = createStore(todoApp)

const containerElement = document.createElement("div")
containerElement.className = "container"
document.body.appendChild(containerElement)

const width = containerElement.offsetWidth
render(
  <Provider store={store}>
    <App initialKey="C" initialWidth={width} />
  </Provider>,
  containerElement,
)
