import { skipToken } from "@reduxjs/toolkit/query";
import { useAuth } from "app/hooks/AuthProvider";
import { selectAuthorizedLoginId, selectIsAuth } from "features/LoginPage/model/authSlice";
import { useGetProfileQuery, useLazyGetProfileQuery } from "features/ProfilePage/api/profileApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "routes/routes";

export const useSafeUserId = () => {
	const params = useParams()
	const navigate = useNavigate()
	const {userId: authorizedLoginId} = useAuth();
	const isOwner = !params.userId
	const profileId = params.userId ? Number(params.userId) : authorizedLoginId;
	const [fetchProfile, {isLoading: isFetchProfileLoading}] = useLazyGetProfileQuery()

	const { data: profileData, isLoading } = useGetProfileQuery(profileId ?? skipToken)

	// useEffect(() => {
	// 	const fetch = async () => {
	// 		if (profileId) {
	// 			const profileData = await fetchProfile(profileId).unwrap()
	// 			return profileData
	// 		}
	// 		return navigate(PATH.LOGIN)
	// 	}

	// 	fetch()

	// }, [profileId, navigate])

	return {
		profileId,
		profileData,
		isOwner,
		isLoading
	}
}