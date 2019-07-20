import React, { useEffect } from "react";
import { connect } from "react-redux";

import { memoryGameClear } from "../actions/memoryGameActions";

import {
  getMemoryGameGameCards,
  getMemoryGameIsGameRunning
} from "../reducers";

import MemoryGameActions from "./MemoryGameActions";
import MemoryGameCard from "./MemoryGameCard";
import MemoryGameScore from "./MemoryGameScore";

import "./memoryGame.scss";

const MemoryGame = props => {
  const { gameCards, memoryGameClear } = props;

  useEffect(() => {
    return () => {
      memoryGameClear();
    };
  }, [memoryGameClear]);

  const arrayData = [
    { title: "esto" },
    { title: "es" },
    { title: "un" },
    { title: "juego" },
    { title: "de" },
    { title: "memoria" }
  ];

  return (
    <article className="memoryGame">
      {arrayData.slice(0, gameCards).map((element, i) => (
        <MemoryGameCard title={arrayData[i].title} id={i + 1} />
      ))}
      <MemoryGameActions />
      <MemoryGameScore />
    </article>
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
  { memoryGameClear }
)(MemoryGame);
