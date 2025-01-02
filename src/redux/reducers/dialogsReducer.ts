import {  ResultCodesEnum, SingleDialogItemType } from './../../apiDal/apiDal';
import { dialogsAPI } from "../../apiDal/apiDal";
import { ThunkAction } from '@reduxjs/toolkit';
import { AppStateType, AppThunk } from '../redux-store';
import { setAppStatusAC } from './appReducer';
import { handleNetworkError, handleServerError } from '../../utils/errorHandlers';

let initialState = {
  dialogs: {} as DialogsType,
};

export const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case "GET-ALL-MESSAGES-WITH-USER":
			return {
				...state,
				dialogs: {
					...state.dialogs,
					[action.userId]: action.dialogs,
				},
			}

		case "SEND-MESSAGE-TO-SERVER":
			return {
				...state,
				dialogs: {
					...state.dialogs,
					[action.userId]: [...state.dialogs[action.userId], action.message],
				},
			}

		case "DELETE-MESSAGE-FROM-SERVER":
			return {
				...state,
				dialogs: {
					...state.dialogs,
					[action.userId]: state.dialogs[action.userId].filter(m => m.id !== action.messageId),
				},
			}
		default:
			return state
	}
}


//* Action Creators
export const getAllMessagesAC = (userId: number, dialogs: SingleDialogItemType[]) => ({ type: "GET-ALL-MESSAGES-WITH-USER", userId, dialogs } as const);
export const sendMessageAC = (userId: number, message: SingleDialogItemType) => ({ type: "SEND-MESSAGE-TO-SERVER",userId,  message } as const);
export const deleteMessageAC = (messageId: string, userId: number) => ({ type: "DELETE-MESSAGE-FROM-SERVER",  messageId, userId } as const);


//* Thunk Creators

//get all dialogs 
export const getAllDialogsTC = (userId: number): AppThunk => {
  return async (dispatch) => {
		try {
			dispatch(setAppStatusAC("loading"));
      const resp = await dialogsAPI.getAllMessagesFromServer(userId);
      if (resp.data.error === null) {
        dispatch(getAllMessagesAC(userId, resp.data.items));
				console.log(resp.data)
        dispatch(setAppStatusAC("success"));
      } else {
        // handleServerError(dispatch, resp.data);
      }
		} catch (error) {
			handleNetworkError(dispatch, error as {message: string});
		}
  };
};

//send message to a friend
export const sendMessageThunCreator = (userId: number, message: string): AppThunk<Promise<void>> => {
  return (dispatch) => {
		return dialogsAPI.sendMessageToServer(userId, message)
		.then((resp) => {
		if (resp.data.resultCode === ResultCodesEnum.Success) {
			dispatch(sendMessageAC(userId, resp.data.data.message));
		} else {
			handleServerError(dispatch, resp.data)
		}
		})
		.catch((err) => handleNetworkError(dispatch, err))
  };
};

export const deleteMessageTC = (messageId: string, dialogUserId: number): AppThunk<Promise<void>> => {
	return (dispatch) => {
		return dialogsAPI.deleteMessageFromServer(messageId)
			.then((resp) => {
				if (resp.data.resultCode === ResultCodesEnum.Success) {
					dispatch(deleteMessageAC(messageId, dialogUserId))
				} else {
					handleServerError(dispatch, resp.data)
				}
			})
			.catch((err) => handleNetworkError(dispatch, err))
	}
}



//* Types
type InitialStateType = typeof initialState;

export type DialogsType = {
  [userId: number]: SingleDialogItemType[];
};

type ActionsType =
	| ReturnType<typeof sendMessageAC>
	| ReturnType<typeof getAllMessagesAC>
	| ReturnType<typeof deleteMessageAC>

// type ThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>

