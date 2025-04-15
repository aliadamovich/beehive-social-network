import { skipToken } from "@reduxjs/toolkit/query";
import { selectAuthorizedLoginId } from "features/LoginPage/model/authSlice";
import { useGetProfileQuery, useLazyGetProfileQuery } from "features/ProfilePage/api/profileApi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const useSafeUserId = () => {
	const params = useParams()
	const authorizedLoginId = useSelector(selectAuthorizedLoginId);
	const isOwner = !params.userId
	const profileId = params.userId ? Number(params.userId) : authorizedLoginId;

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