import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import {
  MEMORY_GAME_CARD_ACTION,
  MEMORY_GAME_CLEAR,
  MEMORY_GAME_FETCH_CARD,
  MEMORY_GAME_SET_GAME_CARDS,
  MEMORY_GAME_START_GAME,
  MEMORY_GAME_TOGGLE_DEMONSTRATION,
  MEMORY_GAME_TOGGLE_GOLD_MODE
} from "../actionTypes";

import {
  memoryGameCardAction,
  memoryGameClear,
  memoryGameFetchCard,
  memoryGameSetGameCards,
  memoryGameStartGame,
  memoryGameToggleDemonstration,
  memoryGameToggleGoldMode
} from "../memoryGameActions";

import { API_ENDPOINT } from "../../config/constants";

const mockStore = configureMockStore([thunk]);

describe("Memory Game action creators:", () => {
  let instance;

  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it("memoryGameCardAction", () => {
    const idCard = "idCard";
    const expected = {
      type: MEMORY_GAME_CARD_ACTION,
      payload: {
        idCard
      }
    };
    const actual = memoryGameCardAction(idCard);
    expect(actual).toEqual(expected);
  });

  it("memoryGameClear", () => {
    const expected = {
      type: MEMORY_GAME_CLEAR
    };
    const actual = memoryGameClear();
    expect(actual).toEqual(expected);
  });

  it("memoryGameFetchCard", async () => {
    const store = mockStore();
    const idHsCard = "idHsCard";
    const expected = {
      type: MEMORY_GAME_FETCH_CARD,
      payload: {
        data: idHsCard
      }
    };

    const apiEndPoint = API_ENDPOINT + idHsCard;

    moxios.stubRequest(apiEndPoint, {
      status: 200,
      responseText: [idHsCard]
    });

    await store.dispatch(memoryGameFetchCard(idHsCard));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expected);
  });

  it("memoryGameSetGameCards", () => {
    const gameCards = "gameCards";
    const expected = {
      type: MEMORY_GAME_SET_GAME_CARDS,
      payload: {
        gameCards
      }
    };
    const actual = memoryGameSetGameCards(gameCards);
    expect(actual).toEqual(expected);
  });

  it("memoryGameStartGame", () => {
    const expected = {
      type: MEMORY_GAME_START_GAME
    };
    const actual = memoryGameStartGame();
    expect(actual).toEqual(expected);
  });

  it("memoryGameToggleDemonstration", () => {
    const expected = {
      type: MEMORY_GAME_TOGGLE_DEMONSTRATION
    };
    const actual = memoryGameToggleDemonstration();
    expect(actual).toEqual(expected);
  });

  it("memoryGameToggleGoldMode", () => {
    const expected = {
      type: MEMORY_GAME_TOGGLE_GOLD_MODE
    };
    const actual = memoryGameToggleGoldMode();
    expect(actual).toEqual(expected);
  });
});
