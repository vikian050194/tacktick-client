import * as types from "../actionTypes";
import { createAction } from "../createAction";
import * as api from "api";

const onSuccess = (data) => createAction(types.USER_JOIN_SUCCESS)(data);
const onFail = (error) => createAction(types.USER_JOIN_ERROR)(error);

export const userJoinAction = () => {
    return dispatch =>
        api.userJoin({ id: null })
            .then(response => dispatch(onSuccess(response)))
            .catch(error => dispatch(onFail(error)));
};