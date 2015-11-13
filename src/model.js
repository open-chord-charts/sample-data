import * as t from "transduce"


const chromaticKeys = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"]


export function chordsToBars(chords, key) {
  // Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
  // into the same bar.
  // Duplicate a chord if its duration is greater than a bar, as many times as needed.
  // The returned list is a list of lists.
  const sum = (a, b) => a + b
  let bars = []
  let barChords = []
  chords.forEach((chord, idx) => {
    const chord1 = {
      ...chord,
      referenceIndex: idx,
      rendered: renderChord(chord, key),
    }
    if (chord.duration > 1) {
      let remainingDuration = chord.duration
      while (remainingDuration > 0) {
        chord1.duration = 1
        bars.push([chord1])
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
      const barChordsDurationSum = t.transduce(t.map(barChord => barChord.duration), t.completing(sum), 0, barChords)
      if (barChordsDurationSum >= 1) {
        bars.push(barChords)
        barChords = []
      }
    }
  })
  return bars
}


export function renderChord(chord, key) {
  const chartKeyIndex = chromaticKeys.indexOf(key)
  let chordStr = chromaticKeys[(chartKeyIndex + chord.degree) % chromaticKeys.length]
  if (chord.alterations) {
    chordStr += chord.alterations.join()
  }
  return chordStr
}
