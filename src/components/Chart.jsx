import deepEqual from "deep-equal"

import ChartCell from "./ChartCell"
import ChartRow from "./ChartRow"
import Chord from "./Chord"


const Chart = ({
  chromaticKey,
  edited,
  nbBarsByRow,
  partNameColumnWidth = 30,
  removePart,
  rowHeight = 60,
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
                          () => selectChord(slug, partName, idx2)
                        ) :
                        null
                    }
                    selected={
                      selectedChord.chordIndex === idx2 &&
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



export default Chart
