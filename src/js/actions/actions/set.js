import * as types from "../actionTypes";
import { createAction } from "../createAction";

export const actionsSetAction = (data) => createAction(types.ACTIONS_SET)(data);