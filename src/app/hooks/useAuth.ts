import { skipToken } from "@reduxjs/toolkit/query";
import { useLazyMeQuery, useMeQuery } from "features/LoginPage/api/authApi";
import { selectAuthorizedLoginId, selectIsAuth, setIsAuth } from "features/LoginPage/model/authSlice";
import { useGetProfileQuery, useLazyGetProfileQuery } from "features/ProfilePage/api/profileApi";
import { ProfileType } from "features/ProfilePage/api/profileApi.types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "routes/routes";
import { StandartResponse } from "common/types/types";
import { ResultCodes } from "common/enums/enum";
import { Loader } from "common/components/Loader/Loader";
import { AppDispatch } from "app/store";

export const useAuth = () => {
	const [userId, setUserId] = useState<number | null>(null);
	const [isAppInitialized, setIsAppInitialized] = useState(false);
	const dispatch = useDispatch<AppDispatch>()
	const [triggerGetMe, {isLoading: isTriggerGetMeLoading}] = useLazyMeQuery()

	const isAuth = useSelector(selectIsAuth)

	const checkAuth = async () => {
		try {
			const { resultCode, data } = await triggerGetMe().unwrap()
			if (resultCode === ResultCodes.Success && data && 'id' in data) {
				setUserId(data.id)
				dispatch(setIsAuth({ isAuth: true, userId: data.id }))
			}
		} catch (error) {
			console.log('error in AuthProvider', error);
		} finally {
			setIsAppInitialized(true)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])


	return {
		userId,
		isAppInitialized,
		isAuth,
		checkAuth
	}
}