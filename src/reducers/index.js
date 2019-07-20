import { combineReducers } from "redux";

import memoryGame from "./memoryGame";

const rootReducer = combineReducers({
  memoryGame
});

export const getMemoryGameBestScore = state => state.memoryGame.bestScore;
export const getMemoryGameCpuCardSequence = state =>
  state.memoryGame.cpuCardSequence;
export const getMemoryGameGameCards = state => state.memoryGame.gameCards;
export const getMemoryGameHsCardsData = state => state.memoryGame.hsCardsData;
export const getMemoryGameIsGameDemonstration = state =>
  state.memoryGame.isGameDemonstration;
export const getMemoryGameIsGameRunning = state =>
  state.memoryGame.isGameRunning;

export default rootReducer;
