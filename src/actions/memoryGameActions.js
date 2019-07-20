import axios from "axios";

import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_FETCH_CARD,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME,
  MEMORY_GAME_TOGGLE_DEMONSTRATION
} from "./actionTypes";

import { API_ENDPOINT, API_KEY } from "../config/constants";

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
  };
};

/**
 * Generates an action to clear redux state
 *
 */
export const memoryGameClear = () => {
  return {
    type: MEMORY_GAME_CLEAR
  };
};

/**
 * Generates an action to fetch data card
 *
 */
export const memoryGameFetchCard = idHsCard => {
  const instance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: { "X-RapidAPI-Key": API_KEY }
  });

  return function(dispatch) {
    instance.get(idHsCard).then(response => {
      return dispatch({
        type: MEMORY_GAME_FETCH_CARD,
        payload: {
          data: response.data[0]
        }
      });
    });
  };
};

/**
 * Generates an action to toggle demonstration value
 *
 */
export const memoryGameToggleDemonstration = () => {
  return {
    type: MEMORY_GAME_TOGGLE_DEMONSTRATION
  };
};

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
  };
};

/**
 * Generate an action to start the game
 *
 */
export const memoryGameStartGame = () => {
  return {
    type: MEMORY_GAME_START_GAME
  };
};
