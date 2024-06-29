import { ProfilePage } from "./ProfilePage";
import React from "react";
import { connect } from "react-redux";
import { getStatusThunkCreator, getUserProfileThunkCreator, updateStatusThunkCreator } from "../../redux/reducers/profileReducer";
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
	
	componentDidMount() {
		// debugger
		let profileId = this.props.router.params.userId;
		if (!profileId) profileId = this.props.authorizedLoginId;

		this.props.getUserProfileThunk(profileId);
		this.props.getStatus(profileId);
	}
	render() {
		return <ProfilePage {...this.props}/>
	}
}

function mapStateToProps(state) {
	return {
		userProfile: state.profilePage.userProfile,
		photoGrid: state.grid.photoGrid,
		isAuth: state.auth.isAuth,
		authorizedLoginId: state.auth.autID.id,
		status: state.profilePage.status
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUserProfileThunk: (profile) => dispatch(getUserProfileThunkCreator(profile)),
		getStatus: (profile) => dispatch(getStatusThunkCreator(profile)),
		updateStatus: (st) => dispatch(updateStatusThunkCreator(st))
	}
}

//объединение всех контейнеров с помощью compose
export const ProfilePageContainer = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)
	(ProfileAPIComponent)