import { types } from "actions";

const defaultState = Array(4).fill(null);

export const actionsReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.ACTIONS_SET: {
            return action.value;
        }
        case types.ACTIONS_RESET: {
            return defaultState;
        }
        default:
            return previousState;
    }
};