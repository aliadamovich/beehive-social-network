import c from './ProfilePage.module.scss';
import {FeedContainer} from './Feed/FeedContainer';
import { ActivityContainer } from './Activity/ActivityContainer';
import { PhotoGrid } from './../GalleryPage/Gallery';
import { Loader } from '../common/Loader/Loader';
import user from './../../assets/images/user.png';
import { Container } from '../common/Container';
import cover from './../../assets/images/cover_example.jpg';

export const ProfilePage = (props) => {
	// debugger
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
								 <img src={user} alt="" />
						}
					 </div>
					 <div className={c.name}>
						 {props.userProfile.fullName}
						 {/* Кот Вареникович */}
						 {/* <p>Active 44 min ago</p> */}
						 <p>{props.userProfile.aboutMe}</p>
					 </div>
				 </div>
				 <ul className={c.profile_menu}>
					 <li className={c.active}><a href="#" className="href">Activity</a></li>
					 <li><a href="#" className="href">Profile</a></li>
					 <li><a href="#" className="href">Friends</a></li>
					 <li><a href="#" className="href">Groups</a></li>
					 <li><a href="#" className="href">Forums</a></li>
					 <li><a href="#" className="href">Media</a></li>
				 </ul>
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