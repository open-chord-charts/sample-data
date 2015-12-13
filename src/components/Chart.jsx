import deepEqual from "deep-equal"

import {CHART_PART_NAME_COLUMN_WIDTH, CHART_ROW_HEIGHT, NB_BARS_BY_ROW} from "../constants"
import ChartCell from "./ChartCell"
import ChartRow from "./ChartRow"
import Chord from "../containers/Chord"


const Chart = ({
  edited,
  nbBarsByRow = NB_BARS_BY_ROW,
  partNameColumnWidth = CHART_PART_NAME_COLUMN_WIDTH,
  removePart,
  rowHeight = CHART_ROW_HEIGHT,
  rows,
  selectChord,
  selectedChord,
  slug,
  structureWithRepetitions,
  width = 800,
}) => (
  <table
    style={{
      borderCollapse: "collapse",
      width: "initial",
    }}
  >
    <tbody>
      {
        structureWithRepetitions.map(({partName, isRepetitedPart}, idx) => (
          rows[partName].map((bars, idx1) => (
            <ChartRow
              edited={edited}
              key={`${idx}${idx1}`}
              onRemove={() => removePart(slug, idx)}
              partName={partName}
              partNameColumnWidth={partNameColumnWidth}
            >
              {
                bars.map((chords, idx2) => (
                  <ChartCell
                    height={isRepetitedPart ? rowHeight / 2 : rowHeight}
                    key={idx2}
                    onClick={
                      edited ?
                        (
                          () => selectChord(slug, partName, chords[0].indexInPart)
                        ) :
                        null
                    }
                    selected={
                      selectedChord.index === chords[0].indexInPart &&
                      selectedChord.partName === partName
                    }
                    width={
                      Math.min(
                        (width - partNameColumnWidth) / nbBarsByRow,
                        rowHeight * 1.5,
                      )
                    }
                  >
                    {
                      (
                        isRepetitedPart ||
                        idx2 > 0 && bars[idx2 - 1].length === 1 && deepEqual(chords[0], bars[idx2 - 1][0])
                      ) ?
                        "–" :
                        chords.map((chord, idx3) => (
                          <Chord
                            alterations={chord.alterations}
                            degree={chord.degree}
                            key={idx3}
                          />
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



export default Chart
