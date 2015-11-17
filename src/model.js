import * as tr from "transduce"


// Functional helpers

const sum = (a, b) => a + b


export const chromaticKeys = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"]

// Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
// into the same bar.
// Duplicate a chord if its duration is greater than a bar, as many times as needed.
// The returned list is a list of lists.
export const chordsToBars = (key) => {
  let barChords = []
  return tr.transducer((xfStep, value, chord) => {
    const chord1 = {
      ...chord,
      rendered: renderChord(chord, key),
    }
    if (chord.duration > 1) {
      let remainingDuration = chord.duration
      while (remainingDuration > 0) {
        xfStep(value, [chord1])
        remainingDuration -= 1
      }
      if (remainingDuration > 0) {
        chord1.duration = remainingDuration
        barChords.push(chord1)
      }
    } else {
      barChords.push(chord1)
    }
    if (barChords.length) {
      const barChordsDurationSum = tr.transduce(tr.map(barChord => barChord.duration), tr.completing(sum), 0, barChords)
      if (barChordsDurationSum >= 1) {
        xfStep(value, barChords)
        barChords = []
      }
    }
    return value
  })
}

export const chordsToRows = (chords, key, nbBarsByRow) => tr.into(
  [],
  tr.compose(
    chordsToBars(key),
    tr.partitionAll(nbBarsByRow),
  ),
  chords,
)

export const partsToRows = (chart, key, nbBarsByRow) => tr.into(
  {},
  tr.map(([partName, chords]) => [partName, chordsToRows(chords, key, nbBarsByRow)]),
  chart.parts,
)

export function renderChord(chord, key) {
  const chartKeyIndex = chromaticKeys.indexOf(key)
  let chordStr = chromaticKeys[(chartKeyIndex + chord.degree) % chromaticKeys.length]
  if (chord.alterations) {
    chordStr += chord.alterations.join()
  }
  return chordStr
}
