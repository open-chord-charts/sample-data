import {Component} from 'react'
import {observer} from 'mobx-react'
import r from 'r-dom'

@observer
export default class OneChord extends Component {
  render () {
    const {chord: {quality, rootNote}, height} = this.props
    return r('g', [
      r(
        'text',
        {
          style: { textAnchor: 'middle' },
          x: '50%',
          y: '80%'
        },
        [
          r('tspan', { style: { fontSize: height } }, rootNote),
          quality !== 'M' && r('tspan', { style: { fontSize: height * 0.5 } }, quality === 'm7b5' ? 'm7' : quality)
        ]
      ),
      quality === 'm7b5' && r(
        'text',
        {
          dx: '-0.3em',
          dy: '1em',
          style: { fontSize: height * 0.4, textAnchor: 'end' },
          x: '100%',
          y: '0%'
        },
        'b5'
      )
    ])
  }
}
