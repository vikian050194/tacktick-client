export { userReducer } from "./userReducer";
export { arenaReducer } from "./arenaReducer";
export { actionsReducer } from "./actionsReducer";

export const combineReducers = (reducers) => {
    return function (previousState, action) {
        return Object.keys(reducers).reduce(function (nextState, key) {
            nextState[key] = reducers[key](nextState[key], action);
            return nextState;
        }, previousState);
    };
};