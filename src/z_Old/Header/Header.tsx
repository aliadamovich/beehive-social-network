import { NavLink } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import logo_1 from './../../../assets/images/logo_login.svg';
import { IoLogOutOutline } from "react-icons/io5";
import {S} from './_StylesHeader'
import { Avatar } from '../../common/components/Avatar';
import { FlexWrapper } from '../../common/components/FlexWrapper';
import { MainButton } from '../../common/components/MainButton';

// export const Header = () => {

// 	const login = useSelector(getLogin);
// 	const isAuth = useSelector(getIsAuth);
// 	const photos = useSelector(getAuthUserPhotos)

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
// 						<FlexWrapper gap='40px'>
// 							<S.UserData>
// 								<S.UserName>{login}</S.UserName>
// 								{photos?.small && <Avatar photo={photos.small} />}
// 							</S.UserData>
// 							<S.LogOutButton onClick={onLogoutHandler}><IoLogOutOutline />Log out</S.LogOutButton>
// 						</FlexWrapper>
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

