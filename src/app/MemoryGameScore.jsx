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
      <span>Best score: {bestScore}</span>
      <span>Level: {cpuCardSequence.length}</span>
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
