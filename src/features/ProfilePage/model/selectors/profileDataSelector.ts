import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "app/store";
import { profileAPI } from "features/ProfilePage/api/profileApi";

export const selectProfileData = (profileId?: number) =>
	createSelector(
		(state: AppStateType) => state,
		(state) => (profileId !== undefined ? profileAPI.endpoints.getProfile.select(profileId)(state)?.data : undefined)
	)
