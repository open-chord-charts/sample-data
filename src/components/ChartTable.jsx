import {Component} from 'react'
import {observer} from 'mobx-react'
import R from 'ramda'

import {CHART_PART_NAME_COLUMN_WIDTH, CHART_ROW_HEIGHT, NB_BARS_BY_ROW} from '../constants'
import ChartCell from './ChartCell'
import ChartRow from './ChartRow'

@observer
export default class ChartTable extends Component {
  render () {
    const {chart, width} = this.props
    return (
      <table
        style={{
          borderCollapse: 'collapse',
          width: 'initial'
        }}
      >
        <tbody>
          {
            chart.structureWithRepetitions.map(({partName, isRepetitedPart}, partIdx) => (
              chart.rows[partName].map((bars, rowIdx) => (
                <ChartRow
                  chart={chart}
                  height={isRepetitedPart ? CHART_ROW_HEIGHT / 2 : CHART_ROW_HEIGHT}
                  key={`${partIdx}-${rowIdx}`}
                  partIndex={partIdx}
                  partName={rowIdx === 0 ? partName : ''}
                >
                  {
                    bars.map((chords, barIdx) => (
                      <ChartCell
                        chart={chart}
                        chords={chords}
                        displayedChords={
                          (
                            isRepetitedPart ||
                            barIdx > 0 && bars[barIdx - 1].length === 1 && R.equals(chords[0], bars[barIdx - 1][0])
                          ) ? null : chords
                        }
                        key={barIdx}
                        partIndex={partIdx}
                        partName={partName}
                        width={
                          Math.min(
                            (width - CHART_PART_NAME_COLUMN_WIDTH) / NB_BARS_BY_ROW,
                            CHART_ROW_HEIGHT * 1.5,
                          )
                        }
                      />
                    ))
                  }
                </ChartRow>
              ))
            ))
          }
        </tbody>
      </table>
    )
  }
}
