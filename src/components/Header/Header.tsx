// import { NavLink } from 'react-router-dom';
// import { GoSearch } from "react-icons/go";
// import { useDispatch, useSelector } from 'react-redux';
// import { LogoutThunkCreator } from '../../../redux/reducers/authReducer';
// import logo_1 from './../../assets/images/logo_login.svg'
// import { IoLogOutOutline } from "react-icons/io5";
// import {S}from './Header.styled'
// import { AppDispatch } from '../../../redux/redux-store';

// export const Header = () => {
// 	// debugger
// 	const login = useSelector(state => state.auth.login);
// 	const isAuth = useSelector(state => state.auth.isAuth);
// 	// const userProfile = useSelector(state => state.profilePage.userProfile)

// 	const dispatch = useDispatch<AppDispatch>()
// 	const onLogoutHandler = () => {
// 		dispatch(LogoutThunkCreator())
// 	}
// 	return (
// 		<S.Header>
// 			{
// 				isAuth ?
// 					<S.HeaderContainer>
// 						<S.HeaderSearch>
// 							<label htmlFor=''></label>
// 							<GoSearch />
// 							<input placeholder='search' type="text" name="" id="" />
// 						</S.HeaderSearch>
// 						<S.UserData>
// 							<S.UserName>{login}</S.UserName>

// 							<S.LogOutButton onClick={onLogoutHandler}>
// 								<IoLogOutOutline />
// 								Log out
// 							</S.LogOutButton>
// 							{/* {
// 										userProfile.photos.small !== null ?
// 											<img src={userProfile.photos.small} alt="user" /> :
// 											<img src={null_user} alt="user" />
// 									} */}
// 						</S.UserData>
// 					</S.HeaderContainer>
// 					:
// 					<S.HeaderLogin>
// 						<NavLink to='/login'><img src={logo_1} alt="logo" /></NavLink>
// 						<NavLink to="/login">Login</NavLink>
// 					</S.HeaderLogin>
// 			}
// 		</S.Header>
// 	)
// }

