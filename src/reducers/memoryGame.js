import cloneDeep from "lodash/cloneDeep";

import {
  MEMORY_GAME_ADD_MOVEMENT,
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME
} from "../actions/actionTypes";
import { getRandom } from "../helpers/randomHelper";

const defaultState = {
  bestScore: 0,
  cpuCardSequence: [],
  gameCards: 4,
  isGameRunning: false,
  userCardSequence: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case MEMORY_GAME_ADD_MOVEMENT: {
      return defaultState;
    }

    case MEMORY_GAME_CARD_ACTION: {
      const { idCard } = action.payload;
      const newState = cloneDeep(state);

      newState.userCardSequence = [...newState.userCardSequence, idCard];

      const cpuCardSequenceLength = newState.cpuCardSequence.length;
      const userCardSequenceLength = newState.userCardSequence.length;
      const actualCpu = newState.cpuCardSequence[userCardSequenceLength - 1];
      const actualUser = newState.userCardSequence[userCardSequenceLength - 1];
      const isCorrect = actualCpu === actualUser;

      if (isCorrect) {
        if (cpuCardSequenceLength === userCardSequenceLength) {
          const gameCards = newState.gameCards;
          newState.bestScore =
            newState.bestScore > cpuCardSequenceLength
              ? newState.bestScore
              : cpuCardSequenceLength;
          newState.cpuCardSequence = [
            ...newState.cpuCardSequence,
            getRandom(gameCards)
          ];
          newState.userCardSequence = [];
        }
        return newState;
      }

      return {
        ...defaultState,
        bestScore: newState.bestScore,
        gameCards: newState.gameCards
      };
    }

    case MEMORY_GAME_CLEAR: {
      return defaultState;
    }

    case MEMORY_GAME_SET_GAME_CARDS: {
      const { gameCards } = action.payload;
      const newState = cloneDeep(state);
      newState.gameCards = gameCards;

      return newState;
    }

    case MEMORY_GAME_START_GAME: {
      const newState = cloneDeep(state);
      const gameCards = newState.gameCards;
      newState.isGameRunning = true;
      newState.cpuCardSequence = [
        ...newState.cpuCardSequence,
        getRandom(gameCards)
      ];
      console.log(newState.cpuCardSequence);
      return newState;
    }
    default:
      return state;
  }
}
