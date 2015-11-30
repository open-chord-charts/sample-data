import "babel-polyfill"

import {Provider} from "react-redux"
import {render} from "react-dom"

import App from "./containers/App"
import configureStore from "./store"
import DevTools from "./containers/DevTools"


const store = configureStore()

const containerElement = document.createElement("div")
containerElement.className = "container"
document.body.appendChild(containerElement)

const width = containerElement.offsetWidth
render(
  (
    <Provider store={store}>
      <div>
        <App initialWidth={width} />
        <DevTools />
      </div>
    </Provider>
  ),
  containerElement,
)
