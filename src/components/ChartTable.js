import {Component} from 'react'
import {observer} from 'mobx-react'
import R from 'ramda'
import r from 'r-dom'

import {CHART_PART_NAME_COLUMN_WIDTH, NB_BARS_BY_ROW} from '../constants'
import ChartCell from './ChartCell'
import ChartRow from './ChartRow'

@observer
export default class ChartTable extends Component {
  render () {
    const {chart, width} = this.props
    const cellWidth = (width - CHART_PART_NAME_COLUMN_WIDTH) / NB_BARS_BY_ROW
    const height = cellWidth * 0.609 // Golden number
    return r(
      'table',
      {
        style: {
          borderCollapse: 'collapse',
          width: 'initial'
        }
      },
      r(
        'tbody',
        null,
        chart.structureWithRepetitions.map(({ partName, isRepetitedPart }, partIndex) => chart.rows[partName].map((bars, rowIdx) => r(
          ChartRow,
          {
            chart,
            height,
            key: `${partIndex}-${rowIdx}`,
            partIndex,
            partName: rowIdx === 0 ? partName : ''
          },
          bars.map((chords, barIdx) => r(ChartCell, {
            chart,
            chords,
            displayedChords: isRepetitedPart || barIdx > 0 && bars[barIdx - 1].length === 1 && R.equals(chords[0], bars[barIdx - 1][0]) ? null : chords,
            height,
            key: barIdx,
            partIndex,
            width: cellWidth
          }))
        )))
      )
    )
  }
}
