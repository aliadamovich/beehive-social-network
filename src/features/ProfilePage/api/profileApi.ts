import { baseApi } from "app/baseApi";
import { StandartResponse } from "common/types/types";
import { ProfileType } from "features/ProfilePage/api/profileApi.types";

export const profileAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getProfile: build.query<ProfileType, number>({
			query: (profileId) => `profile/${profileId}`,
			providesTags: ["Profile"],
		}),
		getStatus: build.query<string, number>({
			query: (profileId) => `profile/status/${profileId}`,
			providesTags: ["UserStatus"],
		}),
		updateStatus: build.mutation<StandartResponse, string>({
			query: (userStatus) => ({
				url: "profile/status",
				method: "PUT",
				body: { status: userStatus },
			}),
			invalidatesTags: ["UserStatus"],
		}),
		setProfilePhoto: build.mutation<StandartResponse, FormData>({
			query: (formData) => ({
				url: "profile/photo",
				method: "PUT",
				body: formData,
			}),
			invalidatesTags: ["Profile"],
		}),
		setProfileInfo: build.mutation<StandartResponse, ProfileType>({
			query: (form) => ({
				url: "profile",
				method: "PUT",
				body: form,
			}),
			invalidatesTags: ["Profile"],
		}),
	}),
})

export const {
	useGetProfileQuery,
	useLazyGetProfileQuery,
	useGetStatusQuery,
	useLazyGetStatusQuery, 
	useUpdateStatusMutation,
	useSetProfilePhotoMutation,
	useSetProfileInfoMutation
} = profileAPI
