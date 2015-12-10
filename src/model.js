import * as tr from "transduce"


// Functional helpers

export const sum = (a, b) => a + b
export const toArray = tr.into([])
export const toObject = tr.into({})


export const chromaticKeys = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"]


export const withIndexProperty = (propertyName) => {
  let index = -1
  return tr.transducer(
    function step(xfStep, value, input) {
      index++
      return xfStep(
        value,
        {
          ...input,
          [propertyName]: index,
        },
      )
    }
  )
}


export const withRepetitions = (structure) => toArray(
  tr.transducer(
    function step(xfStep, structure1, partName) {
      return xfStep(
        structure1,
        {
          partName,
          isRepetitedPart: structure1.map((item) => item.partName).includes(partName),
        },
      )
    },
  ),
  structure,
)


// Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
// into the same bar.
// Duplicate a chord if its duration is greater than a bar, as many times as needed.
// The returned list is a list of lists.
export const chordsToBars = () => {
  let barChords = []
  return tr.transducer(
    function step(xfStep, bars, chord) {
      if (chord.duration > 1) {
        let remainingDuration = chord.duration
        while (remainingDuration > 0) {
          xfStep(bars, [chord])
          remainingDuration -= 1
        }
        if (remainingDuration > 0) {
          barChords.push({
            ...chord,
            duration: remainingDuration,
          })
        }
      } else {
        barChords.push(chord)
      }
      if (barChords.length) {
        const barChordsDurationSum = tr.transduce(
          tr.map(barChord => barChord.duration),
          tr.completing(sum),
          0,
          barChords,
        )
        if (barChordsDurationSum >= 1) {
          xfStep(bars, barChords)
          barChords = []
        }
      }
      return bars
    }
  )
}


export const chordsToRows = (chords, nbBarsByRow) => toArray(
  tr.compose(
    withIndexProperty("indexInPart"),
    chordsToBars(),
    tr.partitionAll(nbBarsByRow),
  ),
  chords,
)


export const partsToRows = (chart, nbBarsByRow) => toObject(
  tr.map(([partName, chords]) => [partName, chordsToRows(chords, nbBarsByRow)]),
  chart.parts,
)
