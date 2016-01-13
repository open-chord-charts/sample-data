import deepEqual from "deep-equal"

import {CHART_PART_NAME_COLUMN_WIDTH, CHART_ROW_HEIGHT, NB_BARS_BY_ROW} from "../constants"
import ChartCell from "./ChartCell"
import ChartRow from "./ChartRow"


const Chart = ({
  nbBarsByRow = NB_BARS_BY_ROW,
  partNameColumnWidth = CHART_PART_NAME_COLUMN_WIDTH,
  rowHeight = CHART_ROW_HEIGHT,
  rows,
  selectChord = null,
  selection = null,
  selectPart = null,
  structureWithRepetitions,
  width,
}) => (
  <table
    style={{
      borderCollapse: "collapse",
      width: "initial",
    }}
  >
    <tbody>
      {
        structureWithRepetitions.map(({partName, isRepetitedPart}, partIdx) => (
          rows[partName].map((bars, rowIdx) => (
            <ChartRow
              height={rowHeight}
              isRepetitedPart={isRepetitedPart}
              key={`${partIdx}-${rowIdx}`}
              onPartNameClick={selectPart && (() => { selectPart(partIdx) })}
              partName={rowIdx === 0 ? partName : ""}
            >
              {
                bars.map((chords, barIdx) => (
                  <ChartCell
                    chords={
                      (
                        isRepetitedPart ||
                        barIdx > 0 && bars[barIdx - 1].length === 1 && deepEqual(chords[0], bars[barIdx - 1][0])
                      ) ? null : chords
                    }
                    height={rowHeight}
                    key={barIdx}
                    onClick={selectChord && (() => { selectChord(partName, chords[0].indexInPart) })}
                    selected={
                      selection && (
                        (
                          selection.type === "chord" &&
                          selection.index === chords[0].indexInPart &&
                          selection.partName === partName
                        ) || (
                          selection.type === "part" &&
                          selection.index === partIdx
                        )
                      )
                    }
                    width={
                      Math.min(
                        (width - partNameColumnWidth) / nbBarsByRow,
                        rowHeight * 1.5,
                      )
                    }
                  />
                ))
              }
            </ChartRow>
          ))
        ))
      }
    </tbody>
  </table>
)


export default Chart
