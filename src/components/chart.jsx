import deepEqual from "deep-equal"

import {ChartCell} from "./chart-cell"
import {ChartRow} from "./chart-row"
import {Chord} from "./chord"
import * as model from "../model"


export const Chart = ({chart, chartKey, rowHeight = 60, nbBarsByRow = 8, partNameColumnWidth = 30, width = 800}) => {
  const rows = model.partsToRows(chart, nbBarsByRow)
  const structureWithRepetitionAnnotations = model.annotateStructureWithRepetitions(chart.structure)
  const style = {borderCollapse: "collapse", width: "initial"}
  const chordColumnWidth = Math.min(
    (width - partNameColumnWidth) / nbBarsByRow,
    rowHeight * 1.5,
  )
  return (
    <table style={style}>
      <tbody>
        {
          structureWithRepetitionAnnotations.map(({partName, isRepetitedPart}, idx) => (
            rows[partName].map((bars, idx1) => (
              <ChartRow
                key={`${idx}${idx1}`}
                partName={partName}
                partNameColumnWidth={partNameColumnWidth}
              >
                {
                  bars.map((chords, idx2) => (
                    <ChartCell height={rowHeight} key={idx2} width={chordColumnWidth}>
                      {
                        (
                          isRepetitedPart ||
                          idx2 > 0 && bars[idx2 - 1].length === 1 && deepEqual(chords[0], bars[idx2 - 1][0])
                        ) ?
                          "–" :
                          chords.map((chord, idx3) => (
                            <Chord chartKey={chartKey} chord={chord} key={idx3} />
                          ))
                      }
                    </ChartCell>
                  ))
                }
              </ChartRow>
            ))
          ))
        }
      </tbody>
    </table>
  )
}
