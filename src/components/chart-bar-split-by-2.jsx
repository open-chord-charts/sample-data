export const ChartBarSplitBy2 = ({chords, height = 60, padding = 10, width = 100}) => (
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
      {chords[0].rendered}
    </text>
    <text style={{textAnchor: "end"}} x={width - padding} y={50}>
      {chords[1].rendered}
    </text>
  </svg>
)
