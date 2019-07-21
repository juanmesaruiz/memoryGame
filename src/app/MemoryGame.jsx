import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  memoryGameClear,
  memoryGameToggleDemonstration
} from "../actions/memoryGameActions";

import {
  getMemoryGameCpuCardSequence,
  getMemoryGameGameCards,
  getMemoryGameIsGameDemonstration
} from "../reducers";

import MemoryGameActions from "./MemoryGameActions";
import MemoryGameCard from "./MemoryGameCard";
import MemoryGameScore from "./MemoryGameScore";

import { arrayHSCards } from "../config/constants";

import "./memoryGame.scss";

const MemoryGame = props => {
  const [activeCard, setActiveCard] = useState(null);

  const {
    cpuCardSequence,
    gameCards,
    isGameDemonstration,
    memoryGameClear,
    memoryGameToggleDemonstration
  } = props;

  const finnishDemonstration = () => {
    memoryGameToggleDemonstration();
  };

  useEffect(() => {
    if (isGameDemonstration) {
      setTimeout(() => {
        cpuCardSequence.forEach((el, i) => {
          setTimeout(() => {
            setActiveCard(null);
            setActiveCard(el);
            if (i === cpuCardSequence.length - 1) finnishDemonstration();
          }, 1250 * i);
        });
      }, 500);
    }
  }, [isGameDemonstration]);

  useEffect(() => {
    return () => {
      memoryGameClear();
    };
  }, [memoryGameClear]);

  const actualCards = arrayHSCards.slice(0, gameCards);

  return (
    <article className="memoryGame">
      <section className="memoryGame-cards">
        {actualCards.map((element, i) => (
          <MemoryGameCard
            activeCard={activeCard}
            idHsCard={arrayHSCards[i].idHsCard}
            id={i + 1}
            key={arrayHSCards[i].idHsCard}
          />
        ))}
      </section>
      <section className="memoryGame-action">
        <MemoryGameActions />
        <MemoryGameScore />
      </section>
    </article>
  );
};

const mapStateToProps = state => {
  return {
    cpuCardSequence: getMemoryGameCpuCardSequence(state),
    gameCards: getMemoryGameGameCards(state),
    isGameDemonstration: getMemoryGameIsGameDemonstration(state)
  };
};

export default connect(
  mapStateToProps,
  { memoryGameClear, memoryGameToggleDemonstration }
)(MemoryGame);
