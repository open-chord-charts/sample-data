const requireChart = require.context("../data/charts")

export const chartsData = CHARTS_FILE_NAMES.map((fileName) => ({
  ...requireChart("./" + fileName),
  slug: fileName.slice(0, -".json".length),
}))
