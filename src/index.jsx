import "babel-polyfill"

import {render} from "react-dom"

import {App} from "./components/app"


const div = document.createElement("div")
document.body.appendChild(div)
const width = div.offsetWidth
render(<App initialKey="C" initialWidth={width} />, div)
