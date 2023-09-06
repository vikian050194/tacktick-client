import * as types from "../actionTypes";
import { createAction } from "../createAction";
import * as api from "api";

const onSuccess = (data) => createAction(types.ARENA_FETCH_SUCCESS)(data);
const onFail = (error) => createAction(types.ARENA_FETCH_ERROR)(error);

export const arenaFetchAction = () => {
    return dispatch =>
        api.fetch()
            .then(response => dispatch(onSuccess(response)))
            .catch(error => dispatch(onFail(error)));
};