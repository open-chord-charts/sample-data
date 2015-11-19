import {ChartRow} from "./chart-row"
import * as model from "../model"


export const Chart = ({chart, chartKey, nbBarsByRow = 8, width = 800}) => {
  const rows = model.partsToRows(chart, nbBarsByRow)
  const style = {borderCollapse: "collapse", width: "initial"}
  return (
    <table style={style}>
      <tbody>
        {
          chart.structure.map(
            (partName) => rows[partName].map(
              (bars) => <ChartRow {...{bars, chartKey, nbBarsByRow, partName, width}} />
            )
          )
        }
      </tbody>
    </table>
  )
}
