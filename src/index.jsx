import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import MemoryGame from './components/memoryGame'

import configureStore from './store'

const { store } = configureStore()

render(
  <Provider store={store}>
    <MemoryGame />
  </Provider>,
  document.getElementById('root')
)
