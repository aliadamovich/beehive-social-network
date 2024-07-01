import { ProfilePage } from "./ProfilePage";
import React from "react";
import { connect } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, saveProfileInfoThunkCreator, saveProfilePhotoThunkCreator, updateStatusThunkCreator } from "../../redux/reducers/profileReducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withAuthRedirect } from './../../hoc/WithAuthRedirect';
import { compose } from "redux";

export function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}
	return ComponentWithRouterProp;
}

class ProfileAPIComponent extends React.Component {
	//вынесли общую логику в отдельный метод чтобы не дублировать код
	refreshProfile() {
		let profileId = this.props.router.params.userId;
		if (!profileId) profileId = this.props.authorizedLoginId;

		this.props.getUserProfileThunk(profileId);
		this.props.getStatus(profileId);
	}
	componentDidMount() {
		// debugger
		this.refreshProfile()
	}

	//фиксит багу при переходе со страницы другого польз-ля на меня (не обновлялись данные - потому что компонента не перерисовывалась)
	componentDidUpdate(prevProps) {
		// debugger
		if (this.props.router.params.userId !== prevProps.router.params.userId) {
			this.refreshProfile()
		}
	}
	render() {
		return <ProfilePage {...this.props} isOwner={ !this.props.router.params.userId } />
	}
}

function mapStateToProps(state) {
	return {
		userProfile: state.profilePage.userProfile,
		photoGrid: state.grid.photoGrid,
		isAuth: state.auth.isAuth,
		authorizedLoginId: state.auth.userId,
		status: state.profilePage.status,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUserProfileThunk: (profile) => dispatch(getUserProfileThunkCreator(profile)),
		getStatus: (profile) => dispatch(getStatusThunkCreator(profile)),
		updateStatus: (st) => dispatch(updateStatusThunkCreator(st)),
		savePhoto: (photoFile) => dispatch(saveProfilePhotoThunkCreator(photoFile)),
		saveProfileInfo: (form) => dispatch(saveProfileInfoThunkCreator(form))
	}
}

//объединение всех контейнеров с помощью compose
export const ProfilePageContainer = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)
	(ProfileAPIComponent)