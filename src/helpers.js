import * as tr from "transduce"

import {CHROMATIC_NOTES, NB_BARS_BY_ROW} from "./constants"


// Functional helpers

export const sum = (a, b) => a + b
export const toArray = tr.into([])
export const toObject = tr.into({})


// URLs helpers


export const getGitHubBlobUrl = (chartSlug) =>
  `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${chartSlug}.json`


export const getGitHubCommitUrl = (commit) => `https://github.com/openchordcharts/sample-data/commit/${commit}`


// Degree and note functions


export const getDegree = (note, chartKey) => (
  CHROMATIC_NOTES.indexOf(note) - CHROMATIC_NOTES.indexOf(chartKey) + CHROMATIC_NOTES.length
) % CHROMATIC_NOTES.length


export const getNote = (degree, chartKey) =>
  CHROMATIC_NOTES[(CHROMATIC_NOTES.indexOf(chartKey) + degree) % CHROMATIC_NOTES.length]


// Transducers


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


// Chart structure and rows helpers


export const getRowsFromChords = (chords, nbBarsByRow = NB_BARS_BY_ROW) => toArray(
  tr.compose(
    withIndexProperty("indexInPart"),
    chordsToBars(),
    tr.partitionAll(nbBarsByRow),
  ),
  chords,
)


export const getRowsFromParts = (parts, nbBarsByRow = NB_BARS_BY_ROW) => toObject(
  tr.map(([partName, chords]) => [partName, getRowsFromChords(chords, nbBarsByRow)]),
  parts,
)


export const getStructureWithRepetitions = (structure) => toArray(
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
