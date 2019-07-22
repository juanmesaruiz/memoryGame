import React from 'react'
import { connect } from 'react-redux'

import {
  memoryGameSetGameCards,
  memoryGameToggleGoldMode,
  memoryGameStartGame
} from '../actions/memoryGameActions'
import {
  getMemoryGameIsGameRunning,
  getMemoryGameGameCards
} from '../reducers'

import { defaultSelectValues } from '../config/constants'

const MemoryGameActions = props => {
  const {
    isGameRunning,
    gameCards,
    memoryGameSetGameCards,
    memoryGameToggleGoldMode,
    memoryGameStartGame
  } = props

  const handleGoldCheckBox = () => memoryGameToggleGoldMode()
  const handleSelectGameCards = e => memoryGameSetGameCards(e.target.value)
  const handleStartGame = () => memoryGameStartGame()

  return (
    <>
      <button
        className='memoryGame-action-startButton'
        onClick={handleStartGame}
        disabled={isGameRunning}
      >
        Start game
      </button>
      <div>
        <label>Number of cards:</label>
        <select
          className='memoryGame-action-select'
          aria-label='memoryGame-action-select'
          value={gameCards}
          onChange={handleSelectGameCards}
          disabled={isGameRunning}
        >
          {defaultSelectValues.map(val => (
            <option key={val}>{val}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          className='memoryGame-action-goldButton'
          onClick={handleGoldCheckBox}
        >
          Gold Mode
        </button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    gameCards: getMemoryGameGameCards(state),
    isGameRunning: getMemoryGameIsGameRunning(state)
  }
}

export default connect(
  mapStateToProps,
  {
    memoryGameSetGameCards,
    memoryGameStartGame,
    memoryGameToggleGoldMode
  }
)(MemoryGameActions)
