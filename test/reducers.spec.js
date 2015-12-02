import "babel-polyfill"

import deepFreeze from "deep-freeze"
import expect from "expect"

import {chart, editedChartSlugs} from "../src/reducers"
import {commitChart, editChart, removeChartPart} from "../src/actions"


describe("reducers", () => {
  describe("chart", () => {
    it("should handle removeChartPart action", () => {
      const state = {
        slug: "all_of_me",
        parts: {
          A: [],
          B: [],
        },
        structure: ["A", "A", "B", "A"],
        title: "All of me",
      }
      deepFreeze(state)
      const expectedState = {
        ...state,
        structure: ["A", "B", "A"],
      }
      expect(chart(state, removeChartPart("all_of_me", 1))).toEqual(expectedState)
    })
    it("should handle unknown action type", () => {
      const state = {slug: "all_of_me"}
      deepFreeze(state)
      expect(chart(state, {type: "unknown"})).toEqual(state)
    })
  })
  describe("editedChartSlugs", () => {
    describe("commitChart action", () => {
      it("should handle commitChart action when slug matches", () => {
        const state = ["all_of_me"]
        deepFreeze(state)
        const expectedState = []
        expect(editedChartSlugs(state, commitChart("all_of_me"))).toEqual(expectedState)
      })
      it("should handle commitChart action when slug doesn't match", () => {
        const state = ["all_of_me"]
        deepFreeze(state)
        expect(editedChartSlugs(state, commitChart("wrong_slug"))).toEqual(state)
      })
    })
    describe("editChart action", () => {
      it("should work when not edited", () => {
        const state = []
        deepFreeze(state)
        const expectedState = ["all_of_me"]
        expect(editedChartSlugs(state, editChart("all_of_me"))).toEqual(expectedState)
      })
      it("should work when already edited", () => {
        const state = ["all_of_me"]
        deepFreeze(state)
        expect(editedChartSlugs(state, editChart("all_of_me"))).toEqual(state)
      })
    })
    it("should handle unknown action type", () => {
      const state = ["all_of_me"]
      deepFreeze(state)
      expect(editedChartSlugs(state, {type: "unknown"})).toEqual(state)
    })
  })
})
