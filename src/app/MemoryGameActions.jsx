import React from 'react'
import { connect } from 'react-redux'

import {
  memoryGameSetGameCards,
  memorySetGoldMode,
  memoryGameStartGame,
} from '../actions/memoryGameActions'
import {
  getMemoryGameIsGameRunning,
  getMemoryGameGameCards
} from "../reducers";

import { defaultSelectValues } from '../config/constants'

const MemoryGameActions = props => {
  const {
    gameRunning,
    gameCards,
    memoryGameSetGameCards,
    memorySetGoldMode,
    memoryGameStartGame
  } = props;

  const handleSelectGameCards = e => memoryGameSetGameCards(e.target.value);
  const handleStartGame = () => memoryGameStartGame();
  const handleGoldCheckBox = (e) => {
    console.log(e.target.value);
    console.log(e.checked);
    memorySetGoldMode(e.target.value)
  };

  return (
    <>
      <button onClick={handleStartGame} disabled={gameRunning}>Start game</button>
      <div>
        <label>Select number of cards</label>
        <select
          aria-label='memoryGame-action-select'
          value={gameCards}
          onChange={handleSelectGameCards}
          disabled={gameRunning}
        >
          {defaultSelectValues.map(val => (
            <option key={val}>{val}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Gold Mode</label>
        <input type="checkbox" onClick={handleGoldCheckBox}/>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    gameRunning: getMemoryGameIsGameRunning(state),
    gameCards: getMemoryGameGameCards(state),
  }
}

export default connect(
  mapStateToProps,
  {
    memoryGameSetGameCards,
    memoryGameStartGame,
    memorySetGoldMode,
  }
)(MemoryGameActions)
