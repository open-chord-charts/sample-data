import {Component, PropTypes} from "react"

import {Bench} from "./bench"
import charts from "../charts-data"


export class App extends Component {
  static propTypes = {
    initialKey: PropTypes.string.isRequired,
    initialWidth: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props)
    const {initialKey} = props
    this.state = {currentKey: initialKey}
  }
  handleCurrentKeyChange = (currentKey) => {
    this.setState({currentKey})
  }
  render() {
    const {initialWidth} = this.props
    const {currentKey} = this.state
    return (
      <Bench
        {...{charts, currentKey, initialWidth}}
        onCurrentKeyChange={this.handleCurrentKeyChange}
      />
    )
  }
}
