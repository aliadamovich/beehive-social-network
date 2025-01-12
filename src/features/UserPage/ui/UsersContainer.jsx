import { Users } from "./Users";
import { connect } from "react-redux";
import { loadMoreUsersThunkCreator, toggleFollowingProgressAC, toggleFollowAC, getUsersThunkCreator, followUsersThunkCreator } from "../../../redux/reducers/usersReducer";
import React from "react";
import { withAuthRedirect } from '../../../z_Old/hoc/WithAuthRedirect';
import { compose } from "redux";
import { getFollowingInProgress, getIsFetching, getTotalUsers, getUsersOnPage, obtainUsers, getCurrentPage } from "../../../redux/selectors/users-selectors";
import { withRouter } from "../../../z_Old/ProfilePageContainer";

//!ВНИМАНИЕ! ЭТА КОМПОНЕНТА БОЛЬШЕ НЕ ИСПОЛЬЗУЕТСЯ В ПРИЛОЖЕНИИ И ОСТАВЛЕНА В 
//!КАЧЕСТВЕ ПРИМЕРА

class UsersAPIComponent extends React.Component {

	componentDidMount() {
		this.props.getUsersThunk(this.props.currentPage, this.props.usersOnPage);
	}

	onLoadClick() {
		this.props.loadMoreUsersThunk(this.props.currentPage, this.props.usersOnPage);
	}

	render() {
		return <Users 
						users={this.props.users}
						onLoadClick={this.onLoadClick.bind(this)}
						isFetching={this.props.isFetching}
						followingInProgress={this.props.followingInProgress}
						toggleFollowUsers={this.props.toggleFollowUsers}
					/>
	}
}


function mapStateToProps(state) {
	return {
		users: obtainUsers(state),
		totalUsers: getTotalUsers(state),
		usersOnPage: getUsersOnPage(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

function mapDispatchToProps(dispatch) {
	return{
		toggleFollow: (userId) => { dispatch(toggleFollowAC(userId))},
		toggleFollowingProgress: (isFetching, userId) => { dispatch(toggleFollowingProgressAC(isFetching, userId))},
		getUsersThunk: (currentPage, usersOnPage) => { dispatch(getUsersThunkCreator(currentPage, usersOnPage))},
		loadMoreUsersThunk: (currentPage, usersOnPage) => { dispatch(loadMoreUsersThunkCreator(currentPage, usersOnPage))},
		toggleFollowUsers: (userId) => { dispatch(followUsersThunkCreator(userId))}
	}
}

export const UsersContainer = compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect)
	(UsersAPIComponent);