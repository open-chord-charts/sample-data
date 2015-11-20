import * as tr from "transduce"
import deepEqual from "deep-equal"


// Functional helpers

export const sum = (a, b) => a + b
export const toArray = tr.into([])
export const toObject = tr.into({})

export const repeat = (number, create) => toArray(
  tr.transducer(function step(xfStep, values) {
    for (let idx = 0; idx < number; idx++) {
      const value = create(idx)
      xfStep(values, value)
    }
    return values
  }),
  [null],
)


export const chromaticKeys = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"]


export const annotateStructureWithRepetitions = (structure) => toArray(
  tr.transducer(function step(xfStep, structure1, partName) {
    return xfStep(structure1, {partName, isFirst: !structure1.map((item) => item.partName).includes(partName)})
  }),
  structure,
)


// Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
// into the same bar.
// Duplicate a chord if its duration is greater than a bar, as many times as needed.
// The returned list is a list of lists.
export const chordsToBars = () => {
  let barChords = []
  return tr.transducer(function step(xfStep, bars, chord) {
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
      const barChordsDurationSum = tr.transduce(tr.map(barChord => barChord.duration), tr.completing(sum), 0, barChords)
      if (barChordsDurationSum >= 1) {
        xfStep(bars, barChords)
        barChords = []
      }
    }
    return bars
  })
}


export const chordsToRows = (chords, nbBarsByRow) => toArray(
  tr.compose(
    chordsToBars(),
    tr.partitionAll(nbBarsByRow),
  ),
  chords,
)


export const partsToRows = (chart, nbBarsByRow) => toObject(
  tr.map(([partName, chords]) => [partName, chordsToRows(chords, nbBarsByRow)]),
  chart.parts,
)


export const findAllUniqueChordAlterations = (charts, degree = 0) => toArray(
  tr.compose(
    tr.mapcat((chart) => chart.parts),
    tr.mapcat(([, partChords]) => partChords),
    tr.transducer(function step(xfStep, chords, chord) {
      const isNewChord = chords.every((chord1) => !deepEqual(chord.alterations, chord1.alterations))
      if (isNewChord) {
        xfStep(chords, {...chord, degree})
      }
      return chords
    }),
  ),
  charts,
)
