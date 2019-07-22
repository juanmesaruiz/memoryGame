import React from 'react'
import { connect } from 'react-redux'

import {
  getMemoryGameBestScore,
  getMemoryGameCpuCardSequence
} from '../reducers'

const MemoryGameScore = props => {
  const { bestScore, cpuCardSequence } = props

  return (
    <div className='memoryGame-score'>
      <span>Level: {cpuCardSequence.length}</span>
      <span>
        Best score: <b>{bestScore}</b>
      </span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    bestScore: getMemoryGameBestScore(state),
    cpuCardSequence: getMemoryGameCpuCardSequence(state)
  }
}

export default connect(mapStateToProps)(MemoryGameScore)
