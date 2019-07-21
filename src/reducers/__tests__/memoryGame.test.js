import cloneDeep from 'lodash/cloneDeep'

import reducer from '../memoryGame'

import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_FETCH_CARD,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME,
  MEMORY_GAME_TOGGLE_DEMONSTRATION
} from '../../actions/actionTypes'

import { getRandom } from '../../helpers/randomHelper'

jest.mock('../../helpers/randomHelper')

describe('memoryGame reducer', () => {
  const defaultState = {
    bestScore: 0,
    cpuCardSequence: [],
    gameCards: 4,
    hsCardsData: [],
    isGameDemonstration: false,
    isGameRunning: false,
    userCardSequence: []
  }

  const getRandomMockValue = 2

  beforeEach(() => {
    getRandom.mockReturnValue(getRandomMockValue)
  })

  it('case with default', () => {
    const action = {}
    const initialState = undefined

    expect(reducer(initialState, action)).toEqual(defaultState)
  })

  it('case with MEMORY_GAME_CLEAR', () => {
    const action = {
      type: MEMORY_GAME_CLEAR
    }
    const initialState = undefined

    expect(reducer(initialState, action)).toEqual(defaultState)
  })

  it('case with MEMORY_GAME_FETCH_CARD', () => {
    const action = {
      type: MEMORY_GAME_FETCH_CARD,
      payload: {
        data: 'data'
      }
    }
    const initialState = cloneDeep(defaultState)
    initialState.hsCardsData = [action.payload.data]

    expect(reducer(defaultState, action)).toEqual(initialState)
  })

  it('case with MEMORY_GAME_SET_GAME_CARDS', () => {
    const action = {
      type: MEMORY_GAME_SET_GAME_CARDS,
      payload: {
        gameCards: 6
      }
    }
    const initialState = cloneDeep(defaultState)
    initialState.gameCards = action.payload.gameCards

    expect(reducer(defaultState, action)).toEqual(initialState)
  })

  it('case with MEMORY_GAME_START_GAME', () => {
    const action = {
      type: MEMORY_GAME_START_GAME
    }
    const initialState = cloneDeep(defaultState)

    initialState.isGameDemonstration = true
    initialState.isGameRunning = true
    initialState.cpuCardSequence = [getRandomMockValue]

    expect(reducer(defaultState, action)).toEqual(initialState)
  })

  it('case with MEMORY_GAME_TOGGLE_DEMONSTRATION', () => {
    const action = {
      type: MEMORY_GAME_TOGGLE_DEMONSTRATION
    }
    const initialState = cloneDeep(defaultState)
    initialState.isGameDemonstration = !initialState.isGameDemonstration

    expect(reducer(defaultState, action)).toEqual(initialState)
  })
})
