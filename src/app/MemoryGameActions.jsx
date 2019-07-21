import React from "react";
import { connect } from "react-redux";

import {
  memoryGameSetGameCards,
  memoryGameStartGame
} from "../actions/memoryGameActions";
import {
  getMemoryGameIsGameRunning,
  getMemoryGameGameCards
} from "../reducers";

import { defaultSelectValues } from "../config/constants";

const MemoryGameActions = props => {
  const {
    gameRunning,
    gameCards,
    memoryGameSetGameCards,
    memoryGameStartGame
  } = props;

  const handleSelectGameCards = e => memoryGameSetGameCards(e.target.value);
  const handleStartGame = () => memoryGameStartGame();

  return (
    <>
      <button onClick={handleStartGame} disabled={gameRunning}>Start game</button>
      <select
        aria-label="memoryGame-action-select"
        value={gameCards}
        onChange={handleSelectGameCards}
        disabled={gameRunning}
      >
        {defaultSelectValues.map(val => (
          <option key={val}>{val}</option>
        ))}
      </select>
    </>
  );
};

const mapStateToProps = state => {
  return {
    gameRunning: getMemoryGameIsGameRunning(state),
    gameCards: getMemoryGameGameCards(state)
  };
};

export default connect(
  mapStateToProps,
  {
    memoryGameSetGameCards,
    memoryGameStartGame
  }
)(MemoryGameActions);
