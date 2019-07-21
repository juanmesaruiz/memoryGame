import {
  getMemoryGameBestScore,
  getMemoryGameCpuCardSequence,
  getMemoryGameGameCards,
  getMemoryGameHsCardsData,
  getMemoryGameIsGameDemonstration,
  getMemoryGameIsGameRunning,
  getMemoryGameIsGoldMode
} from "../index";

const defaultState = {
  memoryGame: {
    bestScore: 0,
    cpuCardSequence: [],
    gameCards: [],
    hsCardsData: [],
    isGameDemonstration: false,
    isGameRunning: false,
    isGoldMode: false
  }
};

describe("MemoryGame test suite", () => {
  it("getMemoryGameBestScore", () => {
    expect(getMemoryGameBestScore(defaultState)).toBe(
      defaultState.memoryGame.bestScore
    );
  });
  it("getMemoryGameCpuCardSequence", () => {
    expect(getMemoryGameCpuCardSequence(defaultState)).toBe(
      defaultState.memoryGame.cpuCardSequence
    );
  });
  it("getMemoryGameGameCards", () => {
    expect(getMemoryGameGameCards(defaultState)).toBe(
      defaultState.memoryGame.gameCards
    );
  });
  it("getMemoryGameHsCardsData", () => {
    expect(getMemoryGameHsCardsData(defaultState)).toBe(
      defaultState.memoryGame.hsCardsData
    );
  });
  it("getMemoryGameIsGameDemonstration", () => {
    expect(getMemoryGameIsGameDemonstration(defaultState)).toBe(
      defaultState.memoryGame.isGameDemonstration
    );
  });
  it("getMemoryGameIsGameRunning", () => {
    expect(getMemoryGameIsGameRunning(defaultState)).toBe(
      defaultState.memoryGame.isGameRunning
    );
  });

  it("getMemoryGameIsGoldMode", () => {
    expect(getMemoryGameIsGoldMode(defaultState)).toBe(
      defaultState.memoryGame.isGameRunning
    );
  });
});
