import * as types from "../actionTypes";
import { createAction } from "../createAction";
import * as api from "api";

const onSuccess = (data) => createAction(types.USER_LEAVE_SUCCESS)(data);
const onFail = (error) => createAction(types.USER_LEAVE_ERROR)(error);

export const userLeaveAction = (user) => {
    return dispatch =>
        api.userLeave(user.id)
            .then(response => dispatch(onSuccess(response)))
            .catch(error => dispatch(onFail(error)));
};