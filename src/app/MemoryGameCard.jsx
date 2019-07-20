import React from 'react'
import { connect } from 'react-redux'

import {memoryGameCardAction} from '../actions/memoryGameActions';

const MemoryGameCard = (props) => {
    const {id, title, memoryGameCardAction} = props;

    const handleCardClick = () => memoryGameCardAction(id);

    return (
        <div className="card" onClick={handleCardClick}>
            <h1>{id}</h1>
        </div>
    )
};

export default connect(null, {memoryGameCardAction})(MemoryGameCard);
