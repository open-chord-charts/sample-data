import {createElement} from 'react'
import {render} from 'react-dom'

import App from './components/App'

const rootElement = document.getElementById('app')
const initialWidth = rootElement.offsetWidth

render(createElement(App, {initialWidth}), rootElement)
