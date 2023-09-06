import {
    combineReducers,
    userReducer,
    arenaReducer,
    actionsReducer
} from "reducers";
import {
    applyMiddleware,
    logger,
    thunk
} from "middlewares";
// import { compose } from "utils";
import { createAction, types } from "actions";
import { createStore } from "./createStore";

export const configureStore = (initialState = {}) => {
    const reducer = combineReducers({
        user: userReducer,
        arena: arenaReducer,
        actions: actionsReducer
    });
    const state = { ...initialState };

    // TODO remove this unnecessary code or fix redux extension integration
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const enhanser = composeEnhancers(
    //     applyMiddleware(
    //         thunk,
    //         logger
    //     )
    // );
    const enhanser = applyMiddleware(
        logger,
        thunk
    );
    // const enhanser = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const store = createStore(reducer, state, enhanser);

    store.dispatch(createAction(types.APP_INIT)());

    return store;
};