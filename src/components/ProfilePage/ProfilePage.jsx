import {FeedContainer} from './tabsContent/Feed/FeedContainer';
import { ActivityContainer } from './Activity/ActivityContainer';
import { PhotoGrid } from './../GalleryPage/Gallery';
import { Loader } from '../common/Loader/Loader';
import { Container } from '../common/Container';
import { ProfileStatus } from './ProfileStatus';
import { useState } from 'react';
import { ProfileInfoSection } from './tabsContent/profileInfo/ProfileInfoSection';
import { ProfilePhoto } from './ProfilePhoto';
import styled, { css } from 'styled-components';
import { ProfileCounter } from './ProfileCounter';
import cover from './../../assets/images/cover_example.jpg'
import { FollowedFriends } from './tabsContent/followedFriends/FollowedFriends';

export const ProfilePage = (props) => {
	// debugger
	const tabsData = [
		{ id: 1, tab: 'Activity' },
		{ id: 2, tab: 'Profile' },
		{ id: 3, tab: 'Friends' },
		{ id: 4, tab: 'Groups' },
		{ id: 5, tab: 'Forums' },
		{ id: 6, tab: 'Media' },
	]
	const [activeTab, setActiveTab] = useState('Activity');

	const onPhotoChoose = (event) => {
		props.savePhoto(event.target.files[0])
	}

	if (!props.userProfile) {
		return <Loader />
	}

	const renderTabContent = () => {
		switch (activeTab) {
			case 'Activity':
				return <FeedContainer store={props.store}/>
			case 'Profile':
				return <ProfileInfoSection userProfile={props.userProfile} saveProfileInfo={props.saveProfileInfo} />
			case 'Friends':
				return <FollowedFriends toggleFollowUsers={props.toggleFollowUsers}/>
			case 'Groups':
				return <div>Here will be Groups</div>
			case 'Forums':
				return <div>Here will be Forums</div>
			case 'Media':
				return <div>Here will be Media</div>
			default:
				return <FeedContainer store={props.store} />
		}
	}

 return(
	 <ProfileSection>
		 <Container>

			<StyledProfile>

				<GridProfileUser>
				 	<ProfilePhoto userProfile={props.userProfile} onPhotoChoose={onPhotoChoose} isOwner={props.isOwner}/>
					<ProfileStatus status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
				</GridProfileUser>

				 <TabsMenu>
					 <ul>
						{tabsData.map(tab => {
							return <li onClick={()=> {setActiveTab(tab.tab)}} className={activeTab === tab.tab ? 'active' : ''} key={tab.id}>{tab.tab}</li>
						})}
					 </ul>
				 </TabsMenu>

				 <GridProfileGallery>
					 <ProfileCounter />
					 <PhotoGrid photoGrid={props.photoGrid} />
				 </GridProfileGallery>

				 <GridTabsContent>{renderTabContent()}</GridTabsContent>

				<GridProfileActivity>
					<ActivityContainer store={props.store} />
				</GridProfileActivity>

			 </StyledProfile>

		 </Container>
	 </ProfileSection>
 )
}

const ProfileSection = styled.section`
	position: relative;
		&::before{
			content: '';
			position: absolute;
			width: 100%;
			top: 60px;
			left: 0;
			right: 0;
			height: 200px;
			background: url(${cover}) center/ cover no-repeat;
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
	grid-template-rows: 300px auto;
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
		gap: 10px;
	}
	li {
		padding: 5px;
		width: 60px;
		height: 60px;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease 0s;
		font-size: 13px;
		font-weight: 500;
		transition: all 0.3s ease 0s;
		cursor: pointer;

		&:hover,
		&.active {
			background: linear-gradient(to bottom right,rgb(189, 139, 237), rgb(129, 29, 222));
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
			color: #fff;
		}
	}
`

const GridTabsContent = styled.div`
	padding: 30px 20px 0;
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
