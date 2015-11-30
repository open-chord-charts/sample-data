import deepFreeze from "deep-freeze"
import expect from "expect"

import {chart} from "../src/reducers"
import {editChart} from "../src/actions"


describe("reducers", () => {
  describe("chart", () => {
    const slug = "all_of_me"
    const sampleChart = {
      slug,
      title: "All of me",
    }
    deepFreeze(sampleChart)
    it("should handle editChart action when slug matches", () => {
      const expectedChart = {
        ...sampleChart,
        edited: true,
      }
      expect(chart(sampleChart, editChart(slug))).toEqual(expectedChart)
    })
    it("should handle editChart action when slug doesn't matches", () => {
      expect(chart(sampleChart, editChart("wrong_slug"))).toEqual(sampleChart)
    })
    it("should handle unknown action type", () => {
      expect(chart(sampleChart, {type: "unknown"})).toEqual(sampleChart)
    })
  })
})
