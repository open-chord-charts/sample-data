import DevTools from 'mobx-react-devtools'
import {HotKeys} from 'react-hotkeys'
import {observer} from 'mobx-react'
import {Component} from 'react'

import {appState, chartStore} from '../stores'
import AutoWidth from './AutoWidth'
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
    const {gitHubCommitUrl, initialWidth, lastUpdatedOn, packageVersion} = this.props
    return (
      <HotKeys keyMap={keyMap}>
        <DevTools />
        <h1>OpenChordCharts sample data</h1>
        <p>
          This page shows renderings of OpenChordCharts
          {' '}
          <a href='https://github.com/openchordcharts/sample-data'>sample JSON files</a>.
        </p>
        <p>
          Version {packageVersion}, last updated on
          {' '}
          <a href={gitHubCommitUrl}>{lastUpdatedOn}</a>.
        </p>
        <p>
          Current key:
          {' '}
          <NoteSelect
            onChange={this.handleBenchKeyChange}
            value={appState.benchKey}
          />
        </p>
        <section>
          <AutoWidth initialWidth={initialWidth}>
            {
              chartStore.charts.map((chart) => (
                <ChartBench key={chart.slug} chart={chart} />
              ))
            }
          </AutoWidth>
        </section>
      </HotKeys>
    )
  }
}
