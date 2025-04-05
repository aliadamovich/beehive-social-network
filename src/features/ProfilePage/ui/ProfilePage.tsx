import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../../../common/components/Container";
import { FriendsCounter } from "./friendsCounter/FriendsCounter";
import { Activity } from "./profileActivity/Activity";
import { myTheme } from "../../../styles/Theme";
import { PATH } from "../../../routes/routes";
import logo from './../../../assets/images/logo_login.svg'
import { selectAuthorizedLoginId, selectIsAuth } from "features/LoginPage/model/authSlice";
import { AppDispatch } from "app/store";
import { useLazyGetProfileQuery, useLazyGetStatusQuery } from "features/ProfilePage/api/profileApi";
import { ProfileNavigation } from "features/ProfilePage/ui/tabs/ProfileNavigation";
import { TabsContent } from "features/ProfilePage/ui/tabsContent/TabsContent";
import { ProfileUser } from "features/ProfilePage/ui/ProfileUser/ProfileUser";
import { ProfileMiniGallery } from "features/ProfilePage/ui/profileMiniGallery/ProfileMiniGallery";
import { TABS } from "features/ProfilePage/lib/tabsEnum";
import { ProfileSkeleton } from "features/ProfilePage/ui/skeletons/ProfilePageSkeleton";


export const ProfilePage = () => {
	//!моргание при переходе с пролфиля на профиль
	const isAuth = useSelector(selectIsAuth);
	const params = useParams();
	const isOwner = !params.userId;
	const [activeTab, setActiveTab] = useState<TABS>(isOwner ? TABS.ACTIVITY : TABS.PROFILE);
	const dispatch = useDispatch<AppDispatch>();

	const authorizedLoginId = useSelector(selectAuthorizedLoginId);
	let profileId = params.userId ? Number(params.userId) : authorizedLoginId;
	
	const [getProfileData, {isLoading, isFetching}] = useLazyGetProfileQuery()
	const [getProfileStatus] = useLazyGetStatusQuery()

	useEffect(() => {
		if (!profileId || !isAuth) {
			return
		}
		 getProfileData(profileId).then(() => {
			 setActiveTab(isOwner ? TABS.ACTIVITY : TABS.PROFILE)
		 })
		getProfileStatus(profileId)

	}, [params.userId, profileId])

	if ( isLoading || isFetching) {
		return <ProfileSkeleton />;
	}

	if (!profileId) {
		return <Navigate to={PATH.LOGIN} />
	}

	if (!isAuth) {
		return <Navigate to={PATH.LOGIN} />
	}

	return (
		<ProfileSection>

			<StyledProfileBackground />
			<Container>
				<StyledProfileTop>
					<ProfileUser profileId={profileId} isOwner={isOwner} />
					<ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} isOwner={isOwner} />
				</StyledProfileTop>

				<StyledProfileBottom>
					<StyledProfileGallery>
						<FriendsCounter profileId={profileId} isOwner={isOwner} />
						<ProfileMiniGallery profileId={profileId} isOwner={isOwner} />
					</StyledProfileGallery>

					<TabsContent activeTab={activeTab} profileId={profileId} isOwner={isOwner} />

					<Activity profileId={profileId} isOwner={isOwner}/>
				</StyledProfileBottom>

			</Container>

		</ProfileSection>
	)
}

const ProfileSection = styled.section`
	
`

const StyledProfileBackground = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
		&::before{
			content: '';
			position: absolute;
			width: 100%;
			top: 0px;
			left: 0;
			right: 0;
			height: 250px;
			background: 
				url(${logo}) no-repeat 95% 5%,
				linear-gradient(to bottom right, #8c30e2, #ae73e6 20%, #dfc4f9);
			border-radius: 8px;
		}

		@media ${myTheme.media[768]} {
			&::before{
			background-size: 120px auto, cover;
			}
		}
		@media ${myTheme.media[576]} {
			&::before{
			background:
				linear-gradient(to bottom right, #8c30e2, #ae73e6 20%, #dfc4f9);
			}
		}

`

export const StyledProfileTop = styled.div`
	display: grid;
	grid-template-columns: 280px auto;
	padding-top: 20px;
	margin-bottom: 20px;
	position: relative;

	@media ${myTheme.media[950]} {
		grid-template-columns: 1fr;
		gap: 20px;
	}
`

export const StyledProfileBottom = styled.div`
	display: grid;
	grid-template-columns: 280px auto 20%;
	margin-top: 20px;

	@media ${myTheme.media[1350]} {
		grid-template-columns: 280px auto;
	}
	@media ${myTheme.media[950]} {
		grid-template-columns: 1fr;
	}
`


const StyledProfileGallery = styled.div`
	justify-items: center;
	padding: 30px 20px 0;
	border-top: 1px solid ${myTheme.colors.borderColor};
	>div:nth-child(2) {
		margin-top: 20px;
	}

	@media ${myTheme.media[950]} {
		display: none;
	}
`


//обернули в хок дя выкидывания в случае если поьз-ль не авторизован
// export const ProfilePageContainer = withAuthRedirect(ProfilePage);

