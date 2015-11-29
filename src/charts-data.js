const requireChart = require.context("../data/charts")


export const loadChartsData = (chartsFileNames) => chartsFileNames.map((fileName) => ({
  ...requireChart("./" + fileName),
  slug: fileName.slice(0, -".json".length),
}))
