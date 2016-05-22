import {observable, toJSON, transaction} from 'mobx'
import R from 'ramda'

import {CHROMATIC_NOTES, NB_BARS_BY_ROW} from './constants'
import chartsJson from './charts'

function getDegree (note, chartKey) {
  return (CHROMATIC_NOTES.indexOf(note) - CHROMATIC_NOTES.indexOf(chartKey) + CHROMATIC_NOTES.length) %
    CHROMATIC_NOTES.length
}

function getNote (degree, chartKey) {
  return CHROMATIC_NOTES[(CHROMATIC_NOTES.indexOf(chartKey) + degree) % CHROMATIC_NOTES.length]
}

// Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
// into the same bar.
// Duplicate a chord if its duration is greater than a bar, as many times as needed.
// [chord] -> [[chords]]
function chordsToBars (chords) {
  let bars = []
  let barChords = []
  for (let chord of chords) {
    if (chord.duration > 1) {
      bars = R.concat(bars, R.repeat([chord], Math.floor(chord.duration)))
      const remainingDuration = (chord.duration % 1).toFixed(2)
      if (remainingDuration > 0) {
        barChords = R.append({...chord, duration: remainingDuration}, barChords)
      }
    } else {
      barChords = R.append(chord, barChords)
    }
    if (barChords.length) {
      if (R.sum(R.map(R.prop('duration'), barChords)) >= 1) {
        bars = R.append(barChords, bars)
        barChords = []
      }
    }
  }
  return bars
}

class ChartStore {
  @observable charts
  constructor (chartsJson) {
    this.charts = chartsJson.map(this.createChart)
  }
  createChart (chartJson) {
    return {
      ...chartJson,
      // Initial values
      isEdited: false,
      selectedChord: null,
      selectedPartIndex: null,
      // Rendering
      gitHubBlobUrl: function () {
        return `https://github.com/openchordcharts/sample-data/blob/master/data/charts/${this.slug}.json`
      },
      jsonString: function () {
        return JSON.stringify(R.omit(['selectedChord', 'selectedPartIndex'], toJSON(this)), null, 2)
      },
      // Structure
      rows: function () {
        return R.map(
          R.pipe(
            (chords) => chords.map((chord, indexInPart) => observable({
              ...chord,
              rootNote: function () {
                return getNote(this.degree, appState.benchKey)
              },
              indexInPart
            })),
            chordsToBars,
            R.splitEvery(NB_BARS_BY_ROW),
          ),
          this.parts,
        )
      },
      structureWithRepetitions: function () {
        return this.structure.reduce((acc, partName) => acc.concat({
          partName,
          isRepetitedPart: acc.map((item) => item.partName).includes(partName)
        }), [])
      },
      // Edition
      commit: function (_) {
        transaction(() => {
          this.isEdited = false
          this.selectedChord = null
          this.selectedPartIndex = null
        })
      },
      edit: function (_) {
        transaction(() => {
          this.isEdited = true
          this.selectChord(0, 0)
          this.selectedPartIndex = null
        })
      },
      duplicateSelectedChord: function (_) {
        const {chord, indexInPart, partIndex} = this.selectedChord
        const partName = this.structure[partIndex]
        this.parts[partName] = R.insert(indexInPart, chord, this.parts[partName])
      },
      removeSelectedChord: function (_) {
        const {indexInPart, partIndex} = this.selectedChord
        const partName = this.structure[partIndex]
        transaction(() => {
          this.parts[partName] = R.remove(indexInPart, 1, this.parts[partName])
          const partLength = this.parts[partName].length
          if (partLength === 0) {
            this.selectedChord = null
          } else if (indexInPart >= partLength) {
            this.selectedChord.indexInPart = partLength - 1
          }
        })
      },
      setSelectedChordRootNote: function (note) {
        this.selectedChord.chord.degree = getDegree(note, appState.benchKey)
      },
      selectChord: function (partIndex, indexInPart) {
        const partName = this.structure[partIndex]
        const chord = this.parts[partName][indexInPart]
        transaction(() => {
          this.selectedChord = {partIndex, indexInPart, chord}
          this.selectedPartIndex = null
        })
      },
      selectNextChord: function (_) {
        const {indexInPart, partIndex} = this.selectedChord
        const partName = this.structure[partIndex]
        const newIndexInPart = indexInPart + 1
        if (newIndexInPart > this.parts[partName].length - 1) {
          // Current chord is the last of the part, select the first chord of the next part.
          const newPartIndex = partIndex < this.structure.length - 1 ? partIndex + 1 : 0
          this.selectChord(newPartIndex, 0)
        } else {
          this.selectChord(partIndex, newIndexInPart)
        }
      },
      selectPreviousChord: function (_) {
        const {indexInPart, partIndex} = this.selectedChord
        const newIndexInPart = indexInPart - 1
        if (newIndexInPart < 0) {
          // Current chord is the first of the part, select the last chord of the previous part.
          const newPartIndex = partIndex > 0 ? partIndex - 1 : this.structure.length - 1
          const partName = this.structure[newPartIndex]
          this.selectChord(newPartIndex, this.parts[partName].length - 1)
        } else {
          this.selectChord(partIndex, newIndexInPart)
        }
      },
      selectPart: function (partIndex) {
        transaction(() => {
          this.selectedPartIndex = partIndex
          this.selectedChord = null
        })
      },
      selectedChordRootNote: function () {
        if (this.selectedChord) {
          const {degree} = this.selectedChord.chord
          return getNote(degree, appState.benchKey)
        }
        return null
      },
      selectedPartName: function () {
        return this.structure[this.selectedPartIndex]
      }
    }
  }
}

const chartStore = new ChartStore(chartsJson)

const appState = observable({
  benchKey: 'C'
})

export {
  appState,
  chartStore
}
