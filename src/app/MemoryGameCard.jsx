import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

import {
  memoryGameCardAction,
  memoryGameFetchCard
} from '../actions/memoryGameActions'

import {
  getMemoryGameHsCardsData,
  getMemoryGameIsGameDemonstration,
  getMemoryGameIsGameRunning,
  getMemoryGameIsGoldMode
} from '../reducers'

const MemoryGameCard = props => {
  const [isThisActiveCard, setThisActiveCard] = useState(false)
  const {
    activeCard,
    isGameDemonstration,
    isGameRunning,
    goldMode,
    hsCardsData,
    id,
    idHsCard,
    memoryGameCardAction,
    memoryGameFetchCard
  } = props

  const thisCardData = hsCardsData.find(hsCard => hsCard.cardId === idHsCard)

  useEffect(() => {
    if (!hsCardsData.find(hsCard => hsCard.cardId === idHsCard)) {
      memoryGameFetchCard(idHsCard)
    }
  }, [idHsCard])

  useEffect(() => {
    if (activeCard === id) {
      setThisActiveCard(true)
      setTimeout(() => {
        setThisActiveCard(false)
      }, 500)
    }
  }, [activeCard])

  const handleCardClick = () => {
    if (isGameRunning) memoryGameCardAction(id)
  }

  const imgPath = goldMode ? 'imgGold' : 'img'
  const cardImg = get(thisCardData, imgPath, null)
  const nameImg = get(thisCardData, 'name', null)
  const customClasses = `${isThisActiveCard ? '--active' : ''} ${
    isGameDemonstration || !isGameRunning ? '--disabled' : ''
  }`

  return (
    <div
      className={`memoryGame-card ${customClasses}`}
      onClick={handleCardClick}
    >
      <div className='memoryGame-card-hover' />
      <img className='memoryGame-image' alt={nameImg} src={cardImg} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    goldMode: getMemoryGameIsGoldMode(state),
    isGameDemonstration: getMemoryGameIsGameDemonstration(state),
    isGameRunning: getMemoryGameIsGameRunning(state),
    hsCardsData: getMemoryGameHsCardsData(state)
  }
}

export default connect(
  mapStateToProps,
  { memoryGameCardAction, memoryGameFetchCard }
)(MemoryGameCard)
