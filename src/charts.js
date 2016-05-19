const requireChart = require.context('../static/charts')

export const loadCharts = (chartNames) => chartNames.map((chartName) => ({
  ...requireChart(`./${chartName}.json`),
  slug: chartName
}))

const chartNames = [
  'all_of_me',
  'lullaby_of_birdland'
]

export default loadCharts(chartNames)
