import deepEqual from "deep-equal"

import {ChartBarSimple} from "./chart-bar-simple"
import {ChartBarSplitBy2} from "./chart-bar-split-by-2"
import {ChartCell} from "./chart-cell"
import {ChartRow} from "./chart-row"
import {TextChord} from "./chord"
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
          structureWithRepetitionAnnotations.map(({partName, isFirst}, idx) => (
            rows[partName].map((bars, idx1) => (
              <ChartRow
                height={rowHeight}
                key={`${idx}${idx1}`}
                partName={partName}
                partNameColumnWidth={partNameColumnWidth}
              >
                {
                  isFirst ?
                    bars.map((chords, idx2) => (
                      <ChartCell height={rowHeight} key={idx2} width={chordColumnWidth}>
                        {
                          chords.length === 1 ?
                            (
                              idx2 > 0 && bars[idx2 - 1].length === 1 && deepEqual(chords[0], bars[idx2 - 1][0]) ?
                                <ChartBarSimple children="–" /> :
                                (
                                  <ChartBarSimple>
                                    <TextChord chartKey={chartKey} chord={chords[0]} />
                                  </ChartBarSimple>
                                )
                            ) :
                            chords.length === 2 ?
                              <ChartBarSplitBy2 chartKey={chartKey} chords={chords} width={chordColumnWidth} /> :
                              <p>TODO</p>
                        }
                      </ChartCell>
                    )) :
                    model.repeat(bars.length, (idx3) => (
                      <ChartCell height={rowHeight} key={idx3} width={chordColumnWidth}>
                        <ChartBarSimple children="–" />
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
