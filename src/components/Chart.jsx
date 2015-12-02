import deepEqual from "deep-equal"

import * as model from "../model"
import ChartCell from "./ChartCell"
import ChartRow from "./ChartRow"
import Chord from "./Chord"


const Chart = ({chart, chromaticKey, edited, rowHeight = 60, nbBarsByRow = 8, onPartRemove, partNameColumnWidth = 30,
    width = 800}) => {
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
                edited={edited}
                key={`${idx}${idx1}`}
                onRemove={() => onPartRemove(idx)}
                partName={partName}
                partNameColumnWidth={partNameColumnWidth}
              >
                {
                  bars.map((chords, idx2) => (
                    <ChartCell height={isRepetitedPart ? rowHeight / 2 : rowHeight} key={idx2} width={chordColumnWidth}>
                      {
                        (
                          isRepetitedPart ||
                          idx2 > 0 && bars[idx2 - 1].length === 1 && deepEqual(chords[0], bars[idx2 - 1][0])
                        ) ?
                          "–" :
                          chords.map((chord, idx3) => (
                            <Chord chord={chord} chromaticKey={chromaticKey} key={idx3} />
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


export default Chart
