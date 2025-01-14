import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../../z_Old/hoc/WithAuthRedirect";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProfilePhoto } from "./ProfilePhoto";
import { ProfileStatus } from "./ProfileStatus";
import { Container } from "../../../common/components/Container";
import { ProfileTabs } from "./tabs/ProfileTabs";
import { ProfileCounter } from "./ProfileCounter";
import { FollowedFriends } from "./tabsContent/followedFriends/FollowedFriends";
import { ProfileInfoSection } from "./tabsContent/profileInfo/ProfileInfoSection";
import { Activity } from "./Activity/Activity";
import { PostsFeed } from "./tabsContent/postsFeed/PostsFeed";
import { myTheme } from "../../../styles/Theme";
import { PATH } from "../../../routes/routes";
import logo from './../../../assets/images/logo_login.svg'
import { Loader } from "../../../common/components/Loader/Loader";
import { ProfileSkeleton } from "./skeletons/ProfilePageSkeleton";
import { selectStatus, setAppStatus } from "../../../app/appSlice";
import { selectAuthorizedLoginId, selectIsAuth } from "features/LoginPage/model/authSlice";
import { selectProfileInfo, selectUserStatus, getUserProfileThunkCreator, updateProfilePhotoThunkCreator, updateStatusThunkCreator } from "features/ProfilePage/model/profileSlice";
import { ModalPhotoSlider } from "features/GalleryPage/ui/modalPhotoSlider/ModalPhotoSlider";
import { AppDispatch } from "app/store";
import { useGetProfileQuery, useLazyGetProfileQuery } from "features/ProfilePage/api/profileApi";
import { useMeQuery } from "features/LoginPage/api/authApi";


export const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState('Activity');
	const isAuth = useSelector(selectIsAuth);
	const params = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const [getProfileData] = useLazyGetProfileQuery()

	// const userProfile = useSelector(selectProfileInfo);
	const status = useSelector(selectUserStatus);
	const authorizedLoginId = useSelector(selectAuthorizedLoginId);
	const appStatus = useSelector(selectStatus);
	const { data, isLoading } = useMeQuery()
	// let profileId = params.userId ? Number(params.userId) : authorizedLoginId !== null ? authorizedLoginId : 0;
	let profileId = params.userId ? Number(params.userId) : data?.data.id !== undefined ? authorizedLoginId : 0;
	// let profileId = Number(params.userId) 

	const isOwner = !params.userId;


	// console.log(data);
	// console.log(isAuth);
	// const photos = data?.photos
	//вынесли общую логику в отдельный метод чтобы не дублировать код
	const refreshProfile = async () => {
		// данное выражение проверяет, если в параметрах роута ничего нет то профиьID равен авторизованному, 
		//а если есть, профиль ID равен ему (тк authorizedLoginId мб null пришлось внести доп проверку, чтобы тс не ругался)
		// dispatch(getUserProfileThunkCreator(profileId));
		dispatch(setAppStatus({ status: 'loading' }));
		const data = await getProfileData(profileId as number)
		console.log(data);
	}

	//фиксит багу при переходе со страницы другого польз-ля на меня (не обновлялись данные - потому что компонента не перерисовывалась)
	useEffect(()=> {
		refreshProfile()
	}, [params.userId])



	const updateStatus = (status: string) => {
		dispatch(updateStatusThunkCreator(status))
	}


	const renderTabContent = () => {
		switch (activeTab) {
			case 'Activity':
				return <PostsFeed isOwner={isOwner} />
			case 'Profile':
				return <ProfileInfoSection />
			case 'Friends':
				return <FollowedFriends isOwner={isOwner} />
			case 'Forums':
				return <div>Here will be Forums</div>
			default:
				return <PostsFeed isOwner={!isOwner} />
		}
	}

	//если мы не авторизованы то с пути /profile отправляем на страницу логина
	// if (profileId === 0) {
	// 	return <Navigate to={PATH.LOGIN} />
	// }
	if (!isAuth) {
		return <Navigate to={PATH.LOGIN} />
	}
	if (appStatus === "loading") {
		return <ProfileSkeleton/>
	}
	
	return (
		<ProfileSection>

			<StyledProfileBackground />
			<Container>

				<StyledProfileTop>
					<GridProfileUser>
						{/* <ProfilePhoto profileData={data} isOwner={isOwner} /> */}
						<ProfileStatus status={status} updateStatus={updateStatus} isOwner={isOwner} />
					</GridProfileUser>

					<TabsMenu>
						<ul>
							<ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
						</ul>
					</TabsMenu>
				</StyledProfileTop>

				<StyledProfileBottom>

					<GridProfileGallery>
						{isOwner ?
							<>
								<ProfileCounter />
								<ModalPhotoSlider preview/>
							</>
							: <div>No photos yet...</div>
						}
					</GridProfileGallery>

					<GridTabsContent>{renderTabContent()}</GridTabsContent>

					<GridProfileActivity>
						{isOwner ? <Activity /> : <div>No activity yet...</div>}
					</GridProfileActivity>
				</StyledProfileBottom>


			</Container>

		</ProfileSection>
	)
}
//обернули в хок дя выкидывания в случае если поьз-ль не авторизован
export const ProfilePageContainer = withAuthRedirect(ProfilePage);


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

	@media ${myTheme.media[576]} {
		
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

export const GridProfileUser = styled.div`
	text-align: center;
	position: relative;
	@media ${myTheme.media[950]} {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		padding: 0 10px;
	}

	@media ${myTheme.media[768]} {
		flex-direction: column;
		align-items: center;
	}

	@media ${myTheme.media[576]} {
	align-items: center;
	padding: 0;
	gap: 10px;
}
`

const GridProfileGallery = styled.div`
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

export const TabsMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: end;
	position: relative;
	z-index: 1;
	ul {
		display: flex;
		gap: 20px;
	}
	@media ${myTheme.media[950]} {
		ul {
		justify-content: center;
		}
	}

		@media ${myTheme.media[576]} {
		ul {
			gap: 10px;
		}
	}
`

const GridTabsContent = styled.div`
	padding: 20px 20px 0;
	border: 1px solid ${myTheme.colors.borderColor};
	border-bottom: none;
	border-right: none;

		@media ${myTheme.media[576]} {
			padding: 20px 0;
		}
`

const GridProfileActivity = styled.div`
	padding-top: 30px;
	border-top: 1px solid ${myTheme.colors.borderColor};
	border-left: 1px solid ${myTheme.colors.borderColor};

	@media ${myTheme.media[1350]} {
		display: none;
	}
`
