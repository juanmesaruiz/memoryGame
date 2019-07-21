import React from 'react'
import { connect } from 'react-redux'

import {
  getMemoryGameBestScore,
  getMemoryGameCpuCardSequence
} from '../reducers'

const MemoryGameScore = props => {
  const { bestScore, cpuCardSequence } = props

  return (
    <>
      <p>Best score: {bestScore}</p>
      <p>Level: {cpuCardSequence.length}</p>
    </>
  )
}

const mapStateToProps = state => {
  return {
    bestScore: getMemoryGameBestScore(state),
    cpuCardSequence: getMemoryGameCpuCardSequence(state)
  }
}

export default connect(mapStateToProps)(MemoryGameScore)
