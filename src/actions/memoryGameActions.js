import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME
} from './actionTypes'

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
};

/**
 * Generates an action to clear redux state
 *
 */
export const memoryGameClear = () => {
  return {
    type: MEMORY_GAME_CLEAR
  }
};

/**
 * Generates an action to set game cards in game
 *
 */
export const memoryGameSetGameCards = gameCards => {
  return {
    type: MEMORY_GAME_SET_GAME_CARDS,
    payload:{
      gameCards
    }
  }
};

/**
 * Generate an action to start the game
 *
 */
export const memoryGameStartGame = () => {
  return {
    type: MEMORY_GAME_START_GAME,
  }
};
