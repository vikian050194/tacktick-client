import * as types from "../actionTypes";
import { createAction } from "../createAction";

export const actionsResetAction = () => createAction(types.ACTIONS_RESET)();