import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, saveProfileInfoThunkCreator, saveProfilePhotoThunkCreator, updateStatusThunkCreator } from "../../../redux/reducers/profileReducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withAuthRedirect } from "../../../hoc/WithAuthRedirect";
import { useSelector } from "react-redux";
import { getAuthorizedLoginId } from "../../../redux/selectors/auth-selectors";
import styled from "styled-components";
import cover from './../../../assets/images/main_cover.png';
import { ProfilePhoto } from "./ProfilePhoto";
import { ProfileStatus } from "./ProfileStatus";
import { Container } from "../../common/Container";
import { ProfileTabs } from "./ProfileTabs";
import { PhotoGrid } from '../GalleryPage/PhotoGrid';
import { ProfileCounter } from "./ProfileCounter";
import { FollowedFriends } from "./tabsContent/followedFriends/FollowedFriends";
import { ProfileInfoSection } from "./tabsContent/profileInfo/ProfileInfoSection";
import { AppDispatch } from "../../../redux/redux-store";
import { getProfile, getStatus } from "../../../redux/selectors/profile-selectors";
import { ProfileType } from "../../../types/types";
import { getPhotoGrid } from "../../../redux/selectors/photogrid-selectors";
import { Activity } from "./Activity/Activity";
import { PostsFeed } from "./tabsContent/postsFeed/PostsFeed";


export const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState('Activity');
	
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const userProfile = useSelector(getProfile);
	const status = useSelector(getStatus);
	const authorizedLoginId = useSelector(getAuthorizedLoginId);
	const photoGrid = useSelector(getPhotoGrid);

	//вынесли общую логику в отдельный метод чтобы не дублировать код
	const refreshProfile = () => {
		// данное выражение проверяет, если в параметрах роута ничего нет то профиьID равен авторизованному, 
		//а если есть, профиль ID равен ему (тк authorizedLoginId мб null пришлось внести доп проверку, чтобы тс не ругался)
		let profileId = params.userId ? +params.userId : authorizedLoginId !== null ? authorizedLoginId : 0;

		dispatch(getUserProfileThunkCreator(profileId));
		dispatch(getStatusThunkCreator(profileId));
	}

	//фиксит багу при переходе со страницы другого польз-ля на меня (не обновлялись данные - потому что компонента не перерисовывалась)
	useEffect(()=> {refreshProfile()}, [params.userId])

	const onPhotoChoose = (file: File) => {
		dispatch(saveProfilePhotoThunkCreator(file))
	}

	const updateStatus = (status: string) => {
		dispatch(updateStatusThunkCreator(status))
	}

	const saveProfileInfo = (form: ProfileType) => {
		dispatch(saveProfileInfoThunkCreator(form))
	}

	//доделать логику по открытию фото галереи
	const openPhotoGallery = () => {}

	const renderTabContent = () => {
		switch (activeTab) {
			case 'Activity':
				return <PostsFeed />
			case 'Profile':
				return <ProfileInfoSection userProfile={userProfile} saveProfileInfo={saveProfileInfo} />
			case 'Friends':
				return <FollowedFriends />
			case 'Groups':
				return <div>Here will be Groups</div>
			case 'Forums':
				return <div>Here will be Forums</div>
			case 'Media':
				return <div>Here will be Media</div>
			default:
				return <PostsFeed/>
		}
	}


	return (
		<ProfileSection>

			<Container>

				<StyledProfile>

					<GridProfileUser>
						<ProfilePhoto userProfile={userProfile} onPhotoChoose={onPhotoChoose} isOwner={!params.userId} />
						<ProfileStatus status={status} updateStatus={updateStatus} isOwner={!params.userId} />
					</GridProfileUser>

					<TabsMenu>
						<ul>
							<ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
						</ul>
					</TabsMenu>

					<GridProfileGallery>
						<ProfileCounter />
						<PhotoGrid photoGrid={photoGrid} openPhoto={openPhotoGallery}/>
					</GridProfileGallery>

					<GridTabsContent>{renderTabContent()}</GridTabsContent>

					<GridProfileActivity>
						<Activity/>
					</GridProfileActivity>

				</StyledProfile>

			</Container>
		</ProfileSection>
	)
}
//обернули в хок дя выкидывания в случае если поьз-ль не авторизован
export const ProfilePageContainer = withAuthRedirect(ProfilePage);


const ProfileSection = styled.section`
	position: relative;
		&::before{
			content: '';
			position: absolute;
			width: 100%;
			top: 0px;
			left: 0;
			right: 0;
			height: 250px;
			background: url(${cover}) left 65%/ cover no-repeat;
			border-radius: 8px;
		}
`

const StyledProfile = styled.div`
	position: relative;
	z-index: 100;
	padding-bottom: 20px;
	column-gap: 20px;
	row-gap: 40px;
	display: grid;
	grid-template-columns: 280px auto 20%;
	grid-template-rows: 320px auto;
	grid-template-areas: 
	'user tabs tabs'
	'photos tabsContent activity';
`

const GridProfileUser = styled.div`
	grid-area: user;
	text-align: center;
	position: relative;
`

const GridProfileGallery = styled.div`
	justify-items: center;
	padding-top: 30px;
	border-top: 1px solid rgb(237, 241, 245);
	grid-area: photos;
`

const TabsMenu = styled.nav`
	grid-area: tabs;
	display: flex;
	flex-direction: column;
	justify-content: end;
	ul {
		display: flex;
		gap: 20px;
	}
`

const GridTabsContent = styled.div`
	padding: 20px 20px 0;
	grid-area: tabsContent;
	border-right: 1px solid #edf1f5;
	border-left: 1px solid #edf1f5;
	border-left: 1px solid #edf1f5;
	border-top: 1px solid #edf1f5;
`

const GridProfileActivity = styled.div`
	grid-area: activity;
	padding-top: 30px;
	border-top: 1px solid rgb(237, 241, 245);
`
