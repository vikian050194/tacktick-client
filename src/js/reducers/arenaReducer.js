import { types } from "actions";

const defaultState = {
    index: 0,
    size: 6,
    walls: [],
    history: [{
        players: []
    }]
};

export const arenaReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.ARENA_FETCH_SUCCESS: {
            return {
                ...previousState,
                ...action.value
            };
        }
        default:
            return previousState;
    }
};