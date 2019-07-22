import React from 'react'
import ReactDOM from 'react-dom'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import {
  getMemoryGameIsGameRunning,
  getMemoryGameHsCardsData,
  getMemoryGameIsGameDemonstration
} from '../../reducers'

import {
  memoryGameCardAction,
  memoryGameFetchCard
} from '../../actions/memoryGameActions'

import store from '../../store/__mocks__/mockStore'

import MemoryGameCard from '../MemoryGameCard'
import { arrayHSCards } from '../../config/constants'

jest.mock('../../reducers')
jest.mock('../../actions/memoryGameActions')

const index = 0
const component = (
  <Provider store={store}>
    <MemoryGameCard
      activeCard={index + 1}
      idHsCard={arrayHSCards[index].idHsCard}
      id={index + 1}
    />
  </Provider>
)

const mockHsCardsData = [
  {
    name: 'mockName',
    cardId: arrayHSCards[index].idHsCard
  }
]

const getComponent = () => component

const setup = () => {
  const utils = render(getComponent())
  const cardAction = utils.getByAltText(mockHsCardsData[0].name)
  return {
    cardAction,
    ...utils
  }
}

describe('MemoryGameCard test suite', () => {
  beforeEach(() => {
    getMemoryGameHsCardsData.mockReturnValue(mockHsCardsData)
    getMemoryGameIsGameDemonstration.mockReturnValue(false)
    getMemoryGameIsGameRunning
      .mockReturnValue(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
    memoryGameCardAction.mockReturnValue({
      type: 'memoryGameCardAction'
    })
    memoryGameFetchCard.mockReturnValue({
      type: 'memoryGameFetchCard'
    })
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

  it('Click on a card and call action if game is running', () => {
    const { cardAction } = setup()
    fireEvent.click(cardAction)
    expect(memoryGameCardAction).toHaveBeenCalledTimes(1)
  })

  it('Click on a card and do nothing if game is not running', () => {
    const { cardAction } = setup()
    fireEvent.click(cardAction)
    expect(memoryGameCardAction).toHaveBeenCalledTimes(0)
  })
})
