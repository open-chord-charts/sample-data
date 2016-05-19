import {Component} from 'react'
import {observer} from 'mobx-react'

import {CHART_PART_NAME_COLUMN_WIDTH} from '../constants'

@observer
export default class ChartRow extends Component {
  handlePartNameClick = () => {
    this.props.chart.selectPart(this.props.partIndex)
  }
  render () {
    const {children, height, partName} = this.props
    return (
      <tr style={{height, lineHeight: 0}}>
        <td
          onClick={this.handlePartNameClick}
          style={{
            fontSize: 'small',
            fontStyle: 'italic',
            fontWeight: 'bold',
            verticalAlign: 'middle',
            width: CHART_PART_NAME_COLUMN_WIDTH
          }}
        >
          {partName}
        </td>
        {children}
      </tr>
    )
  }
}
