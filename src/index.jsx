import "babel-polyfill"

import React from "react"
import {render} from "react-dom"

import {App} from "./components/app"


const container = document.createElement("div")
container.className = "container"
document.body.appendChild(container)
const width = container.offsetWidth
render(<App initialKey="C" initialWidth={width} />, container)
