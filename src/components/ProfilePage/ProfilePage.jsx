import c from './ProfilePage.module.scss';
import {FeedContainer} from './Feed/FeedContainer';
import { ActivityContainer } from './Activity/ActivityContainer';
import { PhotoGrid } from './../GalleryPage/Gallery';
import { Loader } from '../common/Loader/Loader';
import null_user from './../../assets/images/user.png';
import { Container } from '../common/Container';
import { ProfileStatus } from './ProfileStatus';

export const ProfilePage = (props) => {
		// debugger
	//выясняем чей профиль показан - авторизованного пользователя или нет чтобы потом использовать в статусе
	const profileOwnerId = Number(props.router.params.userId) || props.authorizedLoginId

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
								 <img src={props.userProfile.photos.large} alt="" /> :
								 <img src={null_user} alt="user's picture" />
						}
					 </div>
					 <div className={c.name}>{props.userProfile.fullName}</div>
				 </div>
				 <div className={c.profile_menu}>
					 <ProfileStatus status={props.status} updateStatus={props.updateStatus} profileOwnerId={profileOwnerId} currentUserId={props.authorizedLoginId}/>
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
				 <FeedContainer store={props.store}/>
				 <div className={c.activity}>
					<ActivityContainer store={props.store} />
				 </div>
			 </div>
		 </Container>

	 </div>
 )
}