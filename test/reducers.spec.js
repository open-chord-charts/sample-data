import deepFreeze from "deep-freeze"
import expect from "expect"

import {chart} from "../src/reducers"
import {commitChart, editChart, removeChartPart} from "../src/actions"


describe("reducers", () => {
  describe("chart", () => {
    it("should handle commitChart action when slug matches", () => {
      const slug = "all_of_me"
      const sampleChart = {
        slug,
        edited: true,
      }
      deepFreeze(sampleChart)
      const expectedChart = {
        ...sampleChart,
        edited: false,
      }
      expect(chart(sampleChart, commitChart(slug))).toEqual(expectedChart)
    })
    it("should handle commitChart action when slug doesn't matches", () => {
      const slug = "all_of_me"
      const sampleChart = {
        slug,
        edited: true,
      }
      deepFreeze(sampleChart)
      expect(chart(sampleChart, commitChart("wrong_slug"))).toEqual(sampleChart)
    })
    it("should handle editChart action when slug matches", () => {
      const slug = "all_of_me"
      const sampleChart = {slug}
      deepFreeze(sampleChart)
      const expectedChart = {
        ...sampleChart,
        edited: true,
      }
      expect(chart(sampleChart, editChart(slug))).toEqual(expectedChart)
    })
    it("should handle editChart action when slug doesn't matches", () => {
      const slug = "all_of_me"
      const sampleChart = {slug}
      deepFreeze(sampleChart)
      expect(chart(sampleChart, editChart("wrong_slug"))).toEqual(sampleChart)
    })
    it("should handle removeChartPart action", () => {
      const slug = "all_of_me"
      const sampleChart = {
        slug,
        parts: {
          A: [],
          B: [],
        },
        structure: ["A", "A", "B", "A"],
        title: "All of me",
      }
      deepFreeze(sampleChart)
      const expectedChart = {
        ...sampleChart,
        structure: ["A", "B", "A"],
      }
      expect(chart(sampleChart, removeChartPart("all_of_me", 1))).toEqual(expectedChart)
    })
    it("should handle unknown action type", () => {
      const slug = "all_of_me"
      const sampleChart = {slug}
      deepFreeze(sampleChart)
      expect(chart(sampleChart, {type: "unknown"})).toEqual(sampleChart)
    })
  })
})
