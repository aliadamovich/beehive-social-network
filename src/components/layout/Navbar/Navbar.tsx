import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import logo from './../../../assets/images/logo.png'
import { Icon } from '../../common/Icon';
import { S } from './_StylesNavbar';
import { PiMegaphone } from "react-icons/pi";
export const Navbar = () => {

	return(
		<S.NavigationContainer>
			<S.LogoNavLink to={'/profile'} aria-label="initial Page">
				<img src={logo} alt="logo" />
			</S.LogoNavLink>

			<S.Navigation>
				<li>
					<NavLink to={'/profile'} aria-label="Profile">
						<Icon iconId='profile' fill='none' />
					</NavLink>
				</li>

				<li>
					<NavLink to="/dialogs" aria-label="Dialogs">
						<Icon iconId='chat' fill='none' />
					</NavLink>
				</li>

				<li>
					<NavLink to="/users" aria-label="Users">
						<Icon iconId='users' fill='none' />
					</NavLink>
				</li>

				<li>
					<NavLink to="/gallery" aria-label="Gallery">
						<Icon iconId='gallery' viewBox="0 0 512 512" fill='none' />
					</NavLink>
				</li>

				<li>
					<NavLink to="/chat" aria-label="Chat">
						<PiMegaphone />
					</NavLink>
				</li>
			</S.Navigation>
		</S.NavigationContainer>
		
	)
}
// const mapStateToProps = (state) => ({ authorizedLoginId: state.auth.userId })
// export default connect(mapStateToProps, null)(Navbar)