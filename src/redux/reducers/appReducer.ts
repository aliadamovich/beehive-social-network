
let initialState = {
  error: 'dfsfkjdsf' as string | null,
  // error: null as string | null,
  status: 'idle' as AppStatusType
};

export const appReducer = ( state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET-APP-ERROR":
      return { ...state, error: action.error };

    case "SET-APP-STATUS":
      return { ...state, status: action.status };

    default:
      return state;
  }
};
//* Action Creators
export const setAppErrorAC = (error: string | null) => ({ type: "SET-APP-ERROR", error } as const);
export const setAppStatusAC = (status: AppStatusType) => ({ type: "SET-APP-STATUS", status } as const);

//* Thunks
//инициализация приложения


//* Types
type setAppErrorActionsType = ReturnType<typeof setAppErrorAC>;
type setAppStatusActionsType = ReturnType<typeof setAppStatusAC>;
type ActionsType = setAppErrorActionsType | setAppStatusActionsType;
type InitialStateType = typeof initialState;
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
