import {Component} from 'react'
import {observer} from 'mobx-react'

import ChordEditToolbar from './ChordEditToolbar'
import PartEditToolbar from './PartEditToolbar'

@observer
export default class ChartToolbar extends Component {
  handleCommitClick = () => {
    this.props.chart.commit()
  }
  handleEditClick = () => {
    this.props.chart.edit()
  }
  render () {
    const {chart} = this.props
    return (
      <div style={{marginBottom: 10, marginTop: 10}}>
        {
          chart.isEdited ? (
            <div>
              <button onClick={this.handleCommitClick} style={{marginRight: 10}}>Commit</button>
              {
                chart.selectedChord ? (
                  <ChordEditToolbar chart={chart} />
                ) : (
                  chart.selectedPartIndex !== null && (
                    <PartEditToolbar chart={chart} />
                  )
                )
              }
            </div>
          ) : (
            <button onClick={this.handleEditClick}>Edit</button>
          )
        }
      </div>
    )
  }
}
