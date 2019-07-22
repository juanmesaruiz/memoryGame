import cloneDeep from 'lodash/cloneDeep'

import reducer from '../memoryGame'

import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_FETCH_CARD,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME,
  MEMORY_GAME_TOGGLE_DEMONSTRATION,
  MEMORY_GAME_TOGGLE_GOLD_MODE
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
    isGoldMode: false,
    isGameRunning: false,
    userCardSequence: []
  }

  const getRandomMockValue = 2
  const jsdomAlert = window.alert

  beforeEach(() => {
    getRandom.mockReturnValue(getRandomMockValue)
    window.alert = () => {}
  })

  afterEach(() => {
    jest.clearAllMocks()
    window.alert = jsdomAlert
  })

  it('case with default', () => {
    const action = {}
    const initialState = undefined

    expect(reducer(initialState, action)).toEqual(defaultState)
  })

  describe('case with MEMORY_GAME_CARD_ACTION', () => {
    const action = {
      type: MEMORY_GAME_CARD_ACTION,
      payload: {
        idCard: 4
      }
    }
    it('when user makes correct sequence but it is not the last card', () => {
      const defaultStateNotLastCard = cloneDeep(defaultState)
      defaultStateNotLastCard.cpuCardSequence = [4, 1]
      const expectedState = cloneDeep(defaultStateNotLastCard)
      expectedState.userCardSequence = [4]

      expect(reducer(defaultStateNotLastCard, action)).toEqual(expectedState)
    })

    it('when user makes correct sequence and is the last card', () => {
      const defaultStateLastCard = cloneDeep(defaultState)
      defaultStateLastCard.hsCardsData = ['hsCardData']
      defaultStateLastCard.cpuCardSequence = [1, 4]
      defaultStateLastCard.userCardSequence = [1]

      const expectedState = cloneDeep(defaultStateLastCard)
      expectedState.bestScore = 2
      expectedState.cpuCardSequence = [
        ...defaultStateLastCard.cpuCardSequence,
        getRandomMockValue
      ]
      expectedState.userCardSequence = []
      expectedState.isGameDemonstration = true

      expect(reducer(defaultStateLastCard, action)).toEqual(expectedState)
    })

    it('when user makes correct sequence, is the last card and bestScore is higher', () => {
      const defaultStateLastCard = cloneDeep(defaultState)
      defaultStateLastCard.bestScore = 4
      defaultStateLastCard.hsCardsData = ['hsCardData']
      defaultStateLastCard.cpuCardSequence = [1, 4]
      defaultStateLastCard.userCardSequence = [1]

      const expectedState = cloneDeep(defaultStateLastCard)
      expectedState.cpuCardSequence = [
        ...defaultStateLastCard.cpuCardSequence,
        getRandomMockValue
      ]
      expectedState.userCardSequence = []
      expectedState.isGameDemonstration = true

      expect(reducer(defaultStateLastCard, action)).toEqual(expectedState)
    })

    it('when user makes incorrect sequence', () => {
      const defaultStateIncorrectSequence = cloneDeep(defaultState)
      defaultStateIncorrectSequence.bestScore = 1
      defaultStateIncorrectSequence.gameCards = 5
      defaultStateIncorrectSequence.hsCardsData = ['hsCardData']
      defaultStateIncorrectSequence.cpuCardSequence = [1, 2]
      defaultStateIncorrectSequence.userCardSequence = [1]

      const expectedState = cloneDeep(defaultState)
      expectedState.bestScore = defaultStateIncorrectSequence.bestScore
      expectedState.gameCards = defaultStateIncorrectSequence.gameCards
      expectedState.hsCardsData = defaultStateIncorrectSequence.hsCardsData

      expect(reducer(defaultStateIncorrectSequence, action)).toEqual(
        expectedState
      )
    })
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
    const expectedState = cloneDeep(defaultState)
    expectedState.hsCardsData = [action.payload.data]

    expect(reducer(defaultState, action)).toEqual(expectedState)
  })

  it('case with MEMORY_GAME_SET_GAME_CARDS', () => {
    const action = {
      type: MEMORY_GAME_SET_GAME_CARDS,
      payload: {
        gameCards: 6
      }
    }
    const expectedState = cloneDeep(defaultState)
    expectedState.gameCards = action.payload.gameCards

    expect(reducer(defaultState, action)).toEqual(expectedState)
  })

  it('case with MEMORY_GAME_START_GAME', () => {
    const action = {
      type: MEMORY_GAME_START_GAME
    }
    const expectedState = cloneDeep(defaultState)

    expectedState.isGameDemonstration = true
    expectedState.isGameRunning = true
    expectedState.cpuCardSequence = [getRandomMockValue]

    expect(reducer(defaultState, action)).toEqual(expectedState)
  })

  it('case with MEMORY_GAME_TOGGLE_DEMONSTRATION', () => {
    const action = {
      type: MEMORY_GAME_TOGGLE_DEMONSTRATION
    }
    const expectedState = cloneDeep(defaultState)
    expectedState.isGameDemonstration = !expectedState.isGameDemonstration

    expect(reducer(defaultState, action)).toEqual(expectedState)
  })

  it('case with MEMORY_GAME_TOGGLE_DEMONSTRATION', () => {
    const action = {
      type: MEMORY_GAME_TOGGLE_GOLD_MODE
    }
    const expectedState = cloneDeep(defaultState)
    expectedState.isGoldMode = !expectedState.isGoldMode

    expect(reducer(defaultState, action)).toEqual(expectedState)
  })
})
