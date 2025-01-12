import { setAppError, setAppStatus } from "app/appSlice";
import { StandartResponse } from "common/types/types";
import { Dispatch } from "redux";



export const handleServerError = <T>(dispatch: Dispatch, data: StandartResponse<T>) => {
	dispatch(setAppError({ error: data.messages ? data.messages[0] : "Some error occurred" }))
	dispatch(setAppStatus({ status: "failed" }))
}

export const handleNetworkError = (dispatch: Dispatch, err: { message: string }) => {
  dispatch(setAppError({error: err.message}));
  dispatch(setAppStatus({status: "failed"}));
};