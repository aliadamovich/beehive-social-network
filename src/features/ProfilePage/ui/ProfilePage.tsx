import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../../common/components/Container";
import { FriendsCounter } from "./friendsCounter/FriendsCounter";
import { Activity } from "./profileActivity/Activity";
import { myTheme } from "../../../styles/Theme";
import logo from './../../../assets/images/logo_login.svg'
import bg from './../../../assets/images/background.png'
import { ProfileNavigation } from "features/ProfilePage/ui/tabs/ProfileNavigation";
import { TabsContent } from "features/ProfilePage/ui/tabsContent/TabsContent";
import { ProfileUser } from "features/ProfilePage/ui/ProfileUser/ProfileUser";
import { ProfileMiniGallery } from "features/ProfilePage/ui/profileMiniGallery/ProfileMiniGallery";
import { TABS } from "features/ProfilePage/lib/tabsEnum";
import { ProfileSkeleton } from "features/ProfilePage/ui/skeletons/ProfilePageSkeleton";
import { useSafeUserId } from "app/hooks/useSafeUserId";


export const ProfilePage = () => {

	const { isOwner, isLoading } = useSafeUserId()
	const [activeTab, setActiveTab] = useState<TABS>(isOwner ? TABS.ACTIVITY : TABS.PROFILE);

	useEffect(() => {
		setActiveTab(isOwner ? TABS.ACTIVITY : TABS.PROFILE)
	}, [isOwner])

	if ( isLoading) {
		return <ProfileSkeleton />;
	}


	// if (!profileId) {
	// 	return <Navigate to={PATH.LOGIN} />
	// }


	return (
		<ProfileSection>

			<StyledProfileBackground />
			<Container>
				<StyledProfileTop>
					<ProfileUser />
					<ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} isOwner={isOwner} />
				</StyledProfileTop>

				<StyledProfileBottom>
					<StyledProfileGallery>
						<FriendsCounter />
						<ProfileMiniGallery/>
					</StyledProfileGallery>

					<TabsContent activeTab={activeTab} />

					<Activity/>
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
			background: url(${bg}) no-repeat;
			/* background: 
				url(${logo}) no-repeat 95% 5%,
				linear-gradient(to bottom right, #8c30e2, #ae73e6 20%, #dfc4f9); */
			border-radius: 8px;
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

