// import { ResultCodes } from "common/enums/enum";
// import { useLazyMeQuery, useMeQuery } from "features/LoginPage/api/authApi";
// import { useCallback, useEffect, useState } from "react";

// export const useAuth = () => {
// 		const [isAppInitialized, setIsAppInitialized] = useState(false)
	
// 		const {data, isLoading: isMeLoading} = useMeQuery()
// 		const [triggerMe, {isLoading: isLazyMeLoading}] = useLazyMeQuery()
// 		const userId = data?.data.id;
// 		const isAuth = !userId;

// 		const isLoading = isMeLoading || isLazyMeLoading || !isAppInitialized
	
		
// 		useEffect(() => {
	
// 			if (!isLoading ) {
// 				setIsAppInitialized(true)
// 				// if (data?.resultCode === ResultCodes.Success) {
// 					// dispatch(setIsAuth({isAuth: true, userId: data.data.id}))
// 				// }
// 			}
// 		},
// 			[isLoading]);
// }