import * as tr from "transduce"
import expect from "expect"

import * as model from "../src/model"
import all_of_me from "../data/charts/all_of_me.json"


describe("model", () => {
  describe("chordsToBars", () => {
    it("transforms chords into rows for each part", () => {
      const rows = tr.into([], model.chordsToBars(all_of_me.key), all_of_me.parts.A)
      expect(rows).toBeA(Array)
      expect(rows.length).toBe(8)
    })
  })
})
