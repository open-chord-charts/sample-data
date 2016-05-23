import {Component} from 'react'
import {HotKeys} from 'react-hotkeys'
import {observer} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Dimensions from 'react-dimensions'
import {h, a, h1, p, section} from 'react-hyperscript-helpers'

import {appState, chartStore} from '../stores'
import ChartBench from './ChartBench'
import NoteSelect from './NoteSelect'

@Dimensions()
@observer
class App extends Component {
  handleBenchKeyChange = (key) => {
    appState.benchKey = key
  }
  render () {
    const keyMap = {
      commit: 'ctrl+enter',
      left: ['left', 'h'],
      redo: 'ctrl+shift+z',
      right: ['right', 'l'],
      undo: 'ctrl+z'
    }
    const {containerWidth: width} = this.props
    return h(HotKeys, {keyMap}, [
      h(DevTools),
      h1('OpenChordCharts sample data'),
      p([
        'This page shows renderings of OpenChordCharts ',
        a({href: 'https://github.com/openchordcharts/sample-data'}, 'sample JSON files'),
        '.'
      ]),
      p([
        'Current key: ',
        h(NoteSelect, {
          onChange: this.handleBenchKeyChange,
          value: appState.benchKey
        })
      ]),
      section(chartStore.charts.map(chart => h(ChartBench, {key: chart.slug, chart, width})))
    ])
  }
}

export default App
