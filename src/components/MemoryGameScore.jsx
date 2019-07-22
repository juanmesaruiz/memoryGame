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
      <p>Level: {cpuCardSequence.length}</p>
      <p>
        Best score: <b>{bestScore}</b>
      </p>
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
