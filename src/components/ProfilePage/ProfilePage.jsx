import c from './ProfilePage.module.scss';
import {FeedContainer} from './tabsContent/Feed/FeedContainer';
import { ActivityContainer } from './Activity/ActivityContainer';
import { PhotoGrid } from './../GalleryPage/Gallery';
import { Loader } from '../common/Loader/Loader';
import null_user from './../../assets/images/user.png';
import { Container } from '../common/Container';
import { ProfileStatus } from './ProfileStatus';
import { useState } from 'react';
import { SectionTitle } from '../common/SectionTitle';
import styled from 'styled-components';
import { ProfileForm } from './tabsContent/profileInfo/ProfileForm';
import { ProfileInfo } from './tabsContent/profileInfo/ProfileInfo';
import { ProfileInfoSection } from './tabsContent/profileInfo/ProfileInfoSection';

const tabsData = [
	{ id: 1, tab: 'Activity' },
	{ id: 2, tab: 'Profile' },
	{ id: 3, tab: 'Friends' },
	{ id: 4, tab: 'Groups' },
	{ id: 5, tab: 'Forums' },
	{ id: 6, tab: 'Media' },
]


export const ProfilePage = (props) => {
	
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
				return <div>Here will be friends</div>
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
	 <div className={c.content}>
		 <div className={c.cover}></div>
		 <Container>
			 <div className={c.profile}>
				 <div className={c.profile_user}>
					 <div className={c.avatar}>
						{
							 props.userProfile.photos.large !== null ?
								 <img src={props.userProfile.photos.large} alt="user" /> :
								 <img src={null_user} alt="user" />
						}
						 {props.isOwner && 
						 <>
						 	<input id='file' className={c.input__file} onChange={onPhotoChoose} type={'file'} />
							 <label htmlFor="file">+</label>
						 </>
						 }
					 </div>
					 
					 <div className={c.name}>{props.userProfile.fullName}</div>
				 </div>
				 
				 <ProfileStatus status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
				
				 <nav className={c.profile_menu}>
					 <ul className={c.profile_menu__list}>
						{tabsData.map(tab => {
							// const onTabClick = () => {renderTabContent(tab.name)}
						 	return <li onClick={()=> {setActiveTab(tab.tab)}} className={activeTab === tab.tab ? c.active : ''}>{tab.tab}</li>
						})}
					 </ul>
				 </nav>

				 <div className={c.photos}>
					 <div className={c.friendsCounter}>
						 <div className={c.friendsCounter__container}>
						 	<div className={c.friendsCounter__friends}>
								<span>0</span>
								 Friends
							</div>
							 <div className={c.friendsCounter__groups}>
								 <span>3</span>
								 Groups
							 </div>
						 </div>
					 </div>
					 <PhotoGrid photoGrid={props.photoGrid} />
				 </div>
				 {renderTabContent()}

				 <div className={c.activity}>
					<ActivityContainer store={props.store} />
				 </div>
			 </div>
		 </Container>

	 </div>
 )
}

