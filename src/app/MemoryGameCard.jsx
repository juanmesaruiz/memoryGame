import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import get from "lodash/get";

import {
  memoryGameCardAction,
  memoryGameFetchCard
} from "../actions/memoryGameActions";
import {
  getMemoryGameHsCardsData,
  getMemoryGameIsGameDemonstration,
  getMemoryGameIsGameRunning
} from "../reducers";

const MemoryGameCard = props => {
  const [isThisActiveCard, setThisActiveCard] = useState(false);
  const {
    activeCard,
    isGameDemonstration,
    gameRunning,
    hsCardsData,
    id,
    idHsCard,
    memoryGameCardAction,
    memoryGameFetchCard
  } = props;

  const thisCardData = hsCardsData.find(hsCard => hsCard.cardId === idHsCard);
  console.log(thisCardData);

  useEffect(() => {
    if (!hsCardsData.find(hsCard => hsCard.cardId === idHsCard)) {
      memoryGameFetchCard(idHsCard);
    }
  }, [idHsCard]);

  useEffect(() => {
    if (activeCard === id) {
      setThisActiveCard(true);
      setTimeout(() => {
        setThisActiveCard(false);
      }, 500);
    }
  }, [activeCard]);

  const handleCardClick = () => {
    if (gameRunning) memoryGameCardAction(id);
  };

  const cardImg = get(thisCardData, "img", null);
  const nameImg = get(thisCardData, "name", null);

  const customClasses = `${isThisActiveCard ? "--active" : ""} ${
    isGameDemonstration ? "--demonstration" : ""
  }`;

  return (
    <div
      className={`memoryGame-card ${customClasses}`}
      onClick={handleCardClick}
    >
      <div className="memoryGame-card-hover" />
      <img className="memoryGame-image" alt={nameImg} src={cardImg} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    gameRunning: getMemoryGameIsGameRunning(state),
    isGameDemonstration: getMemoryGameIsGameDemonstration(state),
    hsCardsData: getMemoryGameHsCardsData(state)
  };
};

export default connect(
  mapStateToProps,
  { memoryGameCardAction, memoryGameFetchCard }
)(MemoryGameCard);
