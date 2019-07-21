import React from "react";
import ReactDOM from "react-dom";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import {
  getMemoryGameIsGameRunning,
  getMemoryGameGameCards
} from "../../reducers";

import {
  memoryGameSetGameCards,
  memoryGameStartGame,
  memoryGameToggleGoldMode
} from "../../actions/memoryGameActions";

import store from "../../store/__mocks__/mockStore";

import MemoryGameActions from "../MemoryGameActions";

jest.mock("../../reducers");
jest.mock("../../actions/memoryGameActions");

const component = (
  <Provider store={store}>
    <MemoryGameActions />
  </Provider>
);

const getComponent = () => component;

const mockReturnGameCards = 4;
const mockReturnSetGameCards = String(mockReturnGameCards + 1);

const setup = () => {
  const utils = render(getComponent());
  const startGameButton = utils.getByText("Start game");
  const setCardsButton = utils.getByLabelText("memoryGame-action-select");
  const goldButton = utils.getByText("Gold Mode");
  return {
    startGameButton,
    setCardsButton,
    goldButton,
    ...utils
  };
};

describe("MemoryGameAction test suite", () => {
  beforeEach(() => {
    getMemoryGameGameCards.mockReturnValue(mockReturnGameCards);
    getMemoryGameIsGameRunning.mockReturnValue(false);
    memoryGameSetGameCards.mockReturnValue({
      type: "memoryGameSetGameCards"
    });
    memoryGameStartGame.mockReturnValue({
      type: "memoryGameStartGame"
    });
    memoryGameToggleGoldMode.mockReturnValue({
      type: "memoryGameToggleGoldMode"
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Click on start game", () => {
    const { startGameButton } = setup();

    fireEvent.click(startGameButton);
    expect(memoryGameStartGame).toHaveBeenCalledTimes(1);
  });

  it("Set new number of cards", () => {
    const { setCardsButton } = setup();

    fireEvent.change(setCardsButton, {
      target: { value: mockReturnSetGameCards }
    });
    expect(memoryGameSetGameCards).toHaveBeenCalledTimes(1);
    expect(memoryGameSetGameCards).toHaveBeenCalledWith(mockReturnSetGameCards);
  });

  it("Click on gold mode button", () => {
    const { goldButton } = setup();

    fireEvent.click(goldButton);
    expect(memoryGameToggleGoldMode).toHaveBeenCalledTimes(1);
  });
});
