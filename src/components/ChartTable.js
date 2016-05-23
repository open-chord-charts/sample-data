import {Component} from 'react'
import {observer} from 'mobx-react'
import R from 'ramda'
import {h, table, tbody} from 'react-hyperscript-helpers'

import {CHART_PART_NAME_COLUMN_WIDTH, NB_BARS_BY_ROW} from '../constants'
import ChartCell from './ChartCell'
import ChartRow from './ChartRow'

@observer
export default class ChartTable extends Component {
  render () {
    const {chart, width} = this.props
    const cellWidth = (width - CHART_PART_NAME_COLUMN_WIDTH) / NB_BARS_BY_ROW
    const height = cellWidth * 0.609 // Golden number
    return table(
      {
        style: {
          borderCollapse: 'collapse',
          width: 'initial'
        }
      },
      [
        tbody(
          chart.structureWithRepetitions.map(
            ({partName, isRepetitedPart}, partIndex) => chart.rows[partName].map(
              (bars, rowIdx) => h(
                ChartRow,
                {
                  chart,
                  height,
                  key: `${partIndex}-${rowIdx}`,
                  partIndex,
                  partName: rowIdx === 0 ? partName : ''
                },
                bars.map(
                  (chords, barIdx) => h(
                    ChartCell,
                    {
                      chart,
                      chords,
                      displayedChords: isRepetitedPart || barIdx > 0 && bars[barIdx - 1].length === 1 &&
                        R.equals(chords[0], bars[barIdx - 1][0]) ? null : chords,
                      height,
                      key: barIdx,
                      partIndex,
                      width: cellWidth
                    }
                  )
                )
              )
            )
          )
        )
      ]
    )
  }
}
