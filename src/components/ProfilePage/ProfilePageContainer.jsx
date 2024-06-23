import { ProfilePage } from "./ProfilePage";
import React from "react";
import { connect } from "react-redux";
import { getUserProfileThunkCreator } from "../../redux/reducers/profileReducer";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withAuthRedirect } from './../../hoc/WithAuthRedirect';
import { compose } from "redux";

function withRouter(Component) {
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

		let profileId = this.props.router.params.userId;
		if (!profileId) profileId = this.props.authorizedLoginId;

		this.props.getUserProfileThunk(profileId);
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
		authorizedLoginId: state.auth.autID.id
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUserProfileThunk: (profile) => dispatch(getUserProfileThunkCreator(profile))
	}
}

//объединение всех контейнеров с помощью compose
export const ProfilePageContainer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter,
	withAuthRedirect
)
	(ProfileAPIComponent)