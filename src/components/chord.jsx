import React from "react"

import {chromaticKeys} from "../model"


export function renderChord(chord, key) {
  const chartKeyIndex = chromaticKeys.indexOf(key)
  let chordStr = chromaticKeys[(chartKeyIndex + chord.degree) % chromaticKeys.length]
  if (chord.alterations) {
    chordStr += chord.alterations.join("")
  }
  return chordStr
}


export function createChord(wrapper) {
  return function Chord({chartKey, chord}) {
    const rendered = renderChord(chord, chartKey)
    return wrapper(null, rendered)
  }
}



export const SVGChord = createChord(React.DOM.tspan)
export const TextChord = createChord(React.DOM.span)
