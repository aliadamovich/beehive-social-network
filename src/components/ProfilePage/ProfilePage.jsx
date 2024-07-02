import c from './ProfilePage.module.scss';
import {FeedContainer} from './Feed/FeedContainer';
import { ActivityContainer } from './Activity/ActivityContainer';
import { PhotoGrid } from './../GalleryPage/Gallery';
import { Loader } from '../common/Loader/Loader';
import null_user from './../../assets/images/user.png';
import { Container } from '../common/Container';
import { ProfileStatus } from './ProfileStatus';
import { ProfileForm } from './profile-form/ProfileForm';
import { ProfileInfo } from './profile-form/ProfileInfo';
import { useState } from 'react';
import { SectionTitle } from '../common/SectionTitle';

export const ProfilePage = (props) => {
	const [editMode, setEditMode] = useState(false)
	const onPhotoChoose = (event) => {
		props.savePhoto(event.target.files[0])
	}

	const onEditClick = () => {
		setEditMode(!editMode)
	}

	if (!props.userProfile) {
		return <Loader />
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
				 <div className={c.profile_menu}>
						<ProfileStatus status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
						<ul className={c.profile_menu__list}>
							<li className={c.active}><a href="#" className="href">Activity</a></li>
							<li><a href="#" className="href">Profile</a></li>
							<li><a href="#" className="href">Friends</a></li>
							<li><a href="#" className="href">Groups</a></li>
							<li><a href="#" className="href">Forums</a></li>
							<li><a href="#" className="href">Media</a></li>
						</ul>
				 </div>
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
				 <div className={c.profile__info}>
					<SectionTitle>Personal Information:</SectionTitle>
					 {editMode 
						? <ProfileForm userProfile={props.userProfile} saveProfileInfo={props.saveProfileInfo} onEditClick={onEditClick} />
						: <ProfileInfo userProfile={props.userProfile} onEditClick={onEditClick} />
					}
				 </div>
				 {/* <FeedContainer store={props.store}/> */}
				 <div className={c.activity}>
					<ActivityContainer store={props.store} />
				 </div>
			 </div>
		 </Container>

	 </div>
 )
}