import React from "react"

import {SVGChord} from "./chord"


export const ChartBarSplitBy2 = ({chartKey, chords, height = 60, padding = 10, width = 100}) => (
  <svg height="100%" width={width}>
    <line
      style={{
        stroke: "#ddd", // Bootstrap table border color.
        strokeWidth: 1,
      }}
      x1={0}
      x2={width}
      y1={height}
      y2={0}
    />
    <text style={{textAnchor: "start"}} x={padding} y={25}>
      <SVGChord chartKey={chartKey} chord={chords[0]} />
    </text>
    <text style={{textAnchor: "end"}} x={width - padding} y={50}>
      <SVGChord chartKey={chartKey} chord={chords[1]} />
    </text>
  </svg>
)
