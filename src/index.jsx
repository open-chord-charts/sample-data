import {render} from "react-dom"

import {Bench} from "./components/bench"
import charts from "./charts-data"


const div = document.createElement("div")
document.body.appendChild(div)
const width = div.offsetWidth
render(<Bench {...{charts, width}} />, div)
