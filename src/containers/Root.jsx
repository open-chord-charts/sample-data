import {Component} from "react"
import {Provider} from "react-redux"

import Bench from "./Bench"


export default class Root extends Component {
  render() {
    const {store, width} = this.props
    return (
      <Provider store={store}>
        <Bench initialWidth={width} />
      </Provider>
    )
  }
}
