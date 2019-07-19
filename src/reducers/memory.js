import {MEMORY_GAME_ADD_MOVEMENT} from '../actions/actionTypes';

const defaultState = {
    isCorrect: true,
    nextMovement: '',
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case MEMORY_GAME_ADD_MOVEMENT: {
            return defaultState;
        }
        default:
            return state;
    }
}