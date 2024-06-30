import c from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import search from './../../assets/images/search.png'
import { useSelector } from 'react-redux';
import null_user from './../../assets/images/user.png';


export const Header = () => {
	// debugger
	const login = useSelector(state => state.auth.autID.login);
	const isAuth = useSelector(state => state.auth.isAuth);
	// const userProfile = useSelector(state => state.profilePage.userProfile)
	return(
		<header className={c.header}>
			<div className={c.container}>
				<div className={c.search}>
					<label htmlFor=''></label>
						<img className={c.search__icon} src={search} alt="search" />
						<input placeholder='search' type="text" name="" id="" />
				</div>
				<div className={c.exit}>
					
					{
					isAuth ?
					<div className={c.exit__auth}>
						<span className={c.exit__text}>{login}</span>
									{/* {
										userProfile.photos.small !== null ?
											<img src={userProfile.photos.small} alt="user" /> :
											<img src={null_user} alt="user" />
									} */}
					</div>
					: <NavLink className={c.exit__text} to="/login">Login</NavLink> 
					}
				</div>
			</div>
		</header>
	)
}
