import {Children} from "react"

import ChartCellSimple from "./ChartCellSimple"
import ChartCellSplitBy2 from "./ChartCellSplitBy2"


const ChartBar = ({children, height, style, width}) => {
  const chords = Children.toArray(children)
  return (
    <svg {...{height, style, width}}>
      {chords.length === 1 ?
        <ChartCellSimple chord={chords[0]} /> :
        <ChartCellSplitBy2 chord1={chords[0]} chord2={chords[1]} {...{height, width}} />
      }
    </svg>
  )
}


export default ChartBar
