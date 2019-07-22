import React from 'react'
import ReactDOM from 'react-dom'
import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'

import {
  getMemoryGameCpuCardSequence,
  getMemoryGameGameCards,
  getMemoryGameIsGameDemonstration
} from '../../reducers'

import store from '../../store/__mocks__/mockStore'
import { mockComponent } from '../../helpers/mockComponent'

import MemoryGame from '../MemoryGame'

jest.mock('../../reducers')
jest.mock('../MemoryGameCard', () => {
  return props => mockComponent('MemoryGameCard', props)
})

const component = (
  <Provider store={store}>
    <MemoryGame />
  </Provider>
)

describe('MemoryGame test suite', () => {
  beforeEach(() => {
    getMemoryGameCpuCardSequence.mockReturnValue([1, 2])
    getMemoryGameGameCards.mockReturnValue(4)
    getMemoryGameIsGameDemonstration.mockReturnValue(false)
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('Renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(component, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Snapshot matchs', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
