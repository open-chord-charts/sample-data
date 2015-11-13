import * as t from "transduce"

import {ChartRow} from "./chart-row"
import * as model from "../model"


export const Chart = ({chart, nbBarsByRow = 8}) => {
  const toBarsByPartName = t.map(([partName, bars]) => [partName, model.chordsToBars(bars, chart.key)])
  const toRowsByPartName = t.map(([partName, bars]) => [partName, t.into([], t.partitionAll(nbBarsByRow), bars)])
  const rowsByPartName = t.into({}, t.compose(toBarsByPartName, toRowsByPartName), chart.parts)
  const style = {borderCollapse: "collapse", width: "initial"}
  return (
    <table style={style}>
      <tbody>
        {
          chart.structure.map(
            (partName) => rowsByPartName[partName].map(
              (bars) => <ChartRow bars={bars} partName={partName} />
            )
          )
        }
      </tbody>
    </table>
  )
}
