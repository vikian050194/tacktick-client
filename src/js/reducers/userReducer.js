import { types } from "actions";

const USER_TYPE_GUEST = "guest";
const USER_TYPE_PLAYER = "player";

const defaultState = {
    id: null,
    type: USER_TYPE_GUEST,
    name: "guest"
};

export const userReducer = (previousState = defaultState, action) => {
    switch (action.type) {
        case types.USER_JOIN_SUCCESS: {
            return {
                id: action.value.id,
                type: USER_TYPE_PLAYER,
                name: action.value.name
            };
        }
        case types.USER_LEAVE_SUCCESS: {
            return defaultState;
        }
        default:
            return previousState;
    }
};