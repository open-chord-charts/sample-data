import {render} from "react-dom"

import {ChartsBench} from "./components/charts-bench"
import charts from "./charts-data"


const div = document.createElement("div")
document.body.appendChild(div)
const width = div.offsetWidth
render(<ChartsBench charts={charts} width={width} />, div)
