import { Dispatch } from "redux";
import { ResponseType } from "../apiDal/apiDal";
import { setAppError, setAppStatus } from "../redux/reducers/appSlice";


export const handleServerError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  dispatch(setAppError({error: data.messages ? data.messages[0] : "Some error occurred"}));
  dispatch(setAppStatus({status: "failed"}));
};

export const handleNetworkError = (dispatch: Dispatch, err: { message: string }) => {
  dispatch(setAppError({error: err.message}));
  dispatch(setAppStatus({status: "failed"}));
};