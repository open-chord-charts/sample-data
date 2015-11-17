import {ChartRow} from "./chart-row"
import * as model from "../model"


export const Chart = ({chart, chartKey, nbBarsByRow = 8, width = 800}) => {
  const rows = model.partsToRows(chart, chartKey, nbBarsByRow)
  const style = {borderCollapse: "collapse", width: "initial"}
  return (
    <table style={style}>
      <tbody>
        {
          chart.structure.map(
            (partName) => rows[partName].map(
              (bars) => <ChartRow bars={bars} nbBarsByRow={nbBarsByRow} partName={partName} width={width} />
            )
          )
        }
      </tbody>
    </table>
  )
}
