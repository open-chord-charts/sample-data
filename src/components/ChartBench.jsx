import {Component} from 'react'
import {HotKeys} from 'react-hotkeys'
import {observer} from 'mobx-react'
import ClipboardButton from 'react-clipboard.js'
import R from 'ramda'

import {DIATONIC_NOTES} from '../constants'
import ChartTable from './ChartTable'
import ChartToolbar from './ChartToolbar'

@observer
export default class ChartBench extends Component {
  render () {
    const {chart, width} = this.props
    const hotKeysHandlers = R.merge(
      R.fromPairs(
        R.map(
          (note) => [
            note.toLowerCase(),
            () => chart.setSelectedChordRootNote(note)
          ],
          DIATONIC_NOTES
        ),
      ),
      {
        M: () => { chart.selectedChord.chord.quality = '' },
        m: () => { chart.selectedChord.chord.quality = 'm' },
        7: () => { chart.selectedChord.chord.quality = '7' },
        1: () => { chart.selectedChord.chord.duration = 1 },
        2: () => { chart.selectedChord.chord.duration = 2 },
        4: () => { chart.selectedChord.chord.duration = 4 },
        commit: () => { chart.commit() },
        del: () => { chart.removeSelectedChord() },
        left: () => { chart.selectPreviousChord() },
        right: () => { chart.selectNextChord() }
      }
    )
    return (
      <article style={{marginBottom: 60}}>
        <h1 id={chart.slug}>
          <a href={'#' + chart.slug} style={{textDecoration: 'none'}} title='Anchor'></a>
          {' '}
          {chart.title}
          {' '}
          ({chart.key})
        </h1>
        <ChartToolbar chart={chart} />
        {
          chart.isEdited ? (
            <HotKeys handlers={hotKeysHandlers}>
              <ChartTable chart={chart} width={width} />
            </HotKeys>
          ) : (
            <ChartTable chart={chart} width={width} />
          )
        }
        <p>
          <a href={chart.gitHubBlobUrl} style={{textDecoration: 'none'}} target='_blank' title='View JSON file'></a>
          {' '}
          <ClipboardButton data-clipboard-text={chart.jsonString}>
            Copy JSON
          </ClipboardButton>
        </p>
      </article>
    )
  }
}
