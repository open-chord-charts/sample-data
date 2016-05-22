import {Component} from 'react'
import {HotKeys} from 'react-hotkeys'
import {observer} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import r from 'r-dom'

import {appState, chartStore} from '../stores'
import ChartBench from './ChartBench'
import NoteSelect from './NoteSelect'

@observer
export default class App extends Component {
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
    const {gitHubCommitUrl, lastUpdatedOn, packageVersion} = this.props
    return r(HotKeys, {keyMap}, [
      r(DevTools, null),
      r('h1', 'OpenChordCharts sample data'),
      r('p', [
        'This page shows renderings of OpenChordCharts ',
        r('a', { href: 'https://github.com/openchordcharts/sample-data' }, 'sample JSON files'),
        '.'
      ]),
      r('p', [
        `Version ${packageVersion}, last updated on `,
        r('a', { href: gitHubCommitUrl }, lastUpdatedOn),
        '.'
      ]),
      r('p', [
        'Current key: ',
        r(NoteSelect, {
          onChange: this.handleBenchKeyChange,
          value: appState.benchKey
        })
      ]),
      r('section', chartStore.charts.map(chart => r(ChartBench, {key: chart.slug, chart, width: 800})))
    ])
  }
}
