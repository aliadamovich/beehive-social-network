import { baseApi } from "app/baseApi";
import { ProfileType } from "features/ProfilePage/api/profileApi.types";

export const profileAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<ProfileType, number>({
			query: (profileId) => `profile/${profileId}`,
			// providesTags: ["Profile"],
		}),
		setProfilePhoto: build.mutation<any, any>({
			query: (formData) => ({
				url: "profile/photo",
				method: "PUT",
				body: formData,
			}),
			// 	// invalidatesTags: ["Auth"],
		}),
		// logout: build.mutation<StandartResponse<{ userId: number } | {}>, void>({
		// 	query: () => ({
		// 		url: "auth/login",
		// 		method: "DELETE",
		// 	}),
		// 	// invalidatesTags: ["Auth"],
		// }),
	}),
})

export const { useGetProfileQuery, useLazyGetProfileQuery, useSetProfilePhotoMutation } = profileAPI
