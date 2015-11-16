import expect from "expect"

import * as model from "../src/model"
import all_of_me from "../data/all_of_me.json"


describe("chordsToBars", () => {
  it("transforms chords into rows for each part", () => {
    const rows = model.chordsToBars(all_of_me.parts.A, all_of_me.key)
    expect(rows).toBeA(Array)
    expect(rows.length).toBe(8)
  })
})
