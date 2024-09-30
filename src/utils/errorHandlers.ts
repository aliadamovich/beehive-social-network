import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC } from "../redux/reducers/appReducer";
import { ResponseType } from "../apiDal/apiDal";


export const handleServerError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  dispatch(setAppErrorAC(data.messages ? data.messages[0] : "Some error occurred"));
  dispatch(setAppStatusAC("failed"));
};

export const handleNetworkError = (dispatch: Dispatch, err: { message: string }) => {
  dispatch(setAppErrorAC(err.message));
  dispatch(setAppStatusAC("failed"));
};