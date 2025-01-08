import {  ResultCodesEnum, SingleDialogItemType } from '../../apiDal/apiDal';
import { dialogsAPI } from "../../apiDal/apiDal";
import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../redux-store';
import { handleNetworkError, handleServerError } from '../../utils/errorHandlers';
import { setAppStatus } from './appSlice';


export const dialogsSlice = createSlice({
	name: "dialogs",
	initialState: {
		dialogs: {} as DialogsType,
	},
	reducers: create => ({
		getAllMessages: create.reducer<{ userId: number, messages: SingleDialogItemType[] }>((state, action) => {
			state.dialogs[action.payload.userId] = action.payload.messages
		}),
		sendMessage: create.reducer<{ userId: number; message: SingleDialogItemType }>((state, action) => {
			 if (!state.dialogs[action.payload.userId]) {
					state.dialogs[action.payload.userId] = []
				}
			state.dialogs[action.payload.userId].push(action.payload.message)
		}),
		deleteMessage: create.reducer<{ messageId: string; userId: number }>((state, action) => {
			const currentUserDialogs = state.dialogs[action.payload.userId] || []
			const index = currentUserDialogs.findIndex(d => d.id === action.payload.messageId)
			if (index !== -1) currentUserDialogs.splice(index, 1)
		}),
	}),
	selectors: {
		selectDialogs: state => state.dialogs
	}
})

export const dialogsReducer = dialogsSlice.reducer;
export const {getAllMessages, sendMessage, deleteMessage} = dialogsSlice.actions
export const {selectDialogs} = dialogsSlice.selectors

//* Thunk Creators

//get all dialogs 
export const getAllDialogsTC = (userId: number): AppThunk => {
  return async (dispatch) => {
		try {
			dispatch(setAppStatus({status: "loading"}));
      const resp = await dialogsAPI.getAllMessagesFromServer(userId);
      if (resp.data.error === null) {
        dispatch(getAllMessages({userId, messages: resp.data.items}));
        dispatch(setAppStatus({status: "success"}));
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
			dispatch(sendMessage({userId, message: resp.data.data.message}));
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
					dispatch(deleteMessage({messageId, userId: dialogUserId}))
				} else {
					handleServerError(dispatch, resp.data)
				}
			})
			.catch((err) => handleNetworkError(dispatch, err))
	}
}



//* Types
type InitialDialogStateType = ReturnType<typeof dialogsSlice.getInitialState>;

export type DialogsType = {
  [userId: number]: SingleDialogItemType[];
};

// type ThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>

