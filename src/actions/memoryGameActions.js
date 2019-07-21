import axios from 'axios'

import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_FETCH_CARD,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME,
  MEMORY_GAME_SET_GOLD_MODE,
  MEMORY_GAME_TOGGLE_DEMONSTRATION
} from './actionTypes'

import { API_ENDPOINT, API_KEY } from '../config/constants'

/**
 * Generates an action that is fired when user clicks a card
 *
 */
export const memoryGameCardAction = idCard => {
  return {
    type: MEMORY_GAME_CARD_ACTION,
    payload: {
      idCard
    }
  }
}

/**
 * Generates an action to clear redux state
 *
 */
export const memoryGameClear = () => {
  return {
    type: MEMORY_GAME_CLEAR
  }
}

/**
 * Generates an action to fetch data card
 *
 */
export const memoryGameFetchCard = idHsCard => {
  const url = API_ENDPOINT + idHsCard
  const config = {
    method: 'get',
    url: url,
    headers: { 'X-RapidAPI-Key': API_KEY },
    timeout: 10000
  }

  return dispatch => {
    return axios(config)
      .then(response => {
        dispatch({
          type: MEMORY_GAME_FETCH_CARD,
          payload: {
            data: response.data[0]
          }
        })
      })
  }
}

/**
 * Generates an action to set game cards in game
 *
 */
export const memoryGameSetGameCards = gameCards => {
  return {
    type: MEMORY_GAME_SET_GAME_CARDS,
    payload: {
      gameCards
    }
  }
}

/**
 * Generates an action to set gold mode
 *
 */
export const memorySetGoldMode = isGoldMode => {
  return {
    type: MEMORY_GAME_SET_GOLD_MODE,
    payload: {
      isGoldMode
    }
  }
}

/**
 * Generate an action to start the game
 *
 */
export const memoryGameStartGame = () => {
  return {
    type: MEMORY_GAME_START_GAME
  }
}

/**
 * Generates an action to toggle demonstration value
 *
 */
export const memoryGameToggleDemonstration = () => {
  return {
    type: MEMORY_GAME_TOGGLE_DEMONSTRATION
  }
}
