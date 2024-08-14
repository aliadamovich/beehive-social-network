import c from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import logo from './../../assets/images/logo.png'
import { Icon } from '../common/Icon';
const Navbar = (props) => {
	// debugger
	return(
		<aside className={c.content}>
			<NavLink to={'/profile/'} className={c.logo} aria-label="initial Page">
				<img src={logo} alt="logo" />
			</NavLink>
			<nav className={c.nav}>
				<NavLink to={'/profile/'} className={({ isActive }) => isActive ? `${c.item} ${c.active}` : c.item} aria-label="Profile">
					<div className={c.svg}>
						<Icon iconId='profile' fill='none'/>
					</div>
				</NavLink>
				<NavLink to="/dialogs" className={({ isActive }) => isActive ? `${c.item} ${c.active}` : c.item} aria-label="Dialogs">
					<div className={c.svg}>
						<Icon iconId='chat' fill='none' />
					</div>
				</NavLink>

				<NavLink to="/users" className={({ isActive }) => isActive ? `${c.item} ${c.active}` : c.item} aria-label="Users">
					<div className={c.svg}>
						<Icon iconId='users' fill='none' />
					</div>
				</NavLink>
				<NavLink to="/gallery" className={({ isActive }) => isActive ? `${c.item} ${c.active}` : c.item} aria-label="Gallery">
					<div className={c.svg}>
						<Icon iconId='gallery' viewBox="0 0 512 512" fill='none'/>
					</div>
				</NavLink>
				<NavLink to="/chat" className={({ isActive }) => isActive ? `${c.item} ${c.active}` : c.item} aria-label="Chat">
					<div className={c.svg}>
						<Icon iconId='newsfeed' viewBox="0 0 32 32" width="64px" height="64px" />
					</div>
				</NavLink>
				{/* <a className={c.item} href="/newsfeed" aria-label="newsfeed">
					<div className={c.svg}>
						<Icon iconId='newsfeed' viewBox="0 0 32 32" width="64px" height="64px" />
					</div>
				</a> */}
				{/* <a className={c.item} href="/cart" aria-label="cart">
					<div className={c.svg}>
						<Icon iconId='cart' fill='none' viewBox="0 0 32 32" />
					</div>
				</a> */}
			</nav>
		</aside>
		
	)
}
const mapStateToProps = (state) => ({ authorizedLoginId: state.auth.userId })
export default connect(mapStateToProps, null)(Navbar)