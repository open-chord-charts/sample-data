import {ChartBar} from "./chart-bar"


export const ChartCell = ({children, height, width}) => {
  return (
    <td style={{
      border: "1px solid #ddd",
      height,
      lineHeight: 0,
      padding: 0,
      textAlign: "center",
      verticalAlign: "middle",
      width,
    }}>
      <ChartBar {...{height, width}}>
        {children}
      </ChartBar>
    </td>
  )
}
