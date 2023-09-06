import * as types from "../actionTypes";
import { createAction } from "../createAction";
import * as api from "api";

const onSuccess = (data) => createAction(types.ACTIONS_SUBMIT_SUCCESS)(data);
const onFail = (error) => createAction(types.ACTIONS_SUBMIT_ERROR)(error);

export const actionsSubmitAction = (payload) => {
    return dispatch => {
        api.submit(payload)
            .then(response => dispatch(onSuccess(response)))
            .catch(error => dispatch(onFail(error)));
    };
};