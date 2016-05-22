import {Component} from 'react'
import {HotKeys} from 'react-hotkeys'
import {observer} from 'mobx-react'
import ClipboardButton from 'react-clipboard.js'
import R from 'ramda'
import r from 'r-dom'

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
    return r('article', { style: { marginBottom: 60 } }, [
      r('h1', { id: chart.slug }, [
        r('a', { href: '#' + chart.slug, style: { textDecoration: 'none' }, title: 'Anchor' }, ''),
        ` ${chart.title} (${chart.key})`
      ]),
      r(ChartToolbar, {chart}),
      chart.isEdited
        ? r(HotKeys, {handlers: hotKeysHandlers}, r(ChartTable, {chart, width}))
        : r(ChartTable, {chart, width}),
      r('p', [
        r(
          'a',
          {
            href: chart.gitHubBlobUrl,
            style: {textDecoration: 'none'},
            target: '_blank',
            title: 'View JSON file'
          },
          ''
        ),
        r(ClipboardButton, {'data-clipboard-text': chart.jsonString}, 'Copy JSON')
      ])
    ])
  }
}
