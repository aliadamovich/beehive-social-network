import { Users } from "./Users";
import { connect } from "react-redux";
import { loadMoreUsersThunkCreator, toggleFollowingProgressAC, toggleFollowAC, getUsersThunkCreator, followUsersThunkCreator } from "../../redux/reducers/usersReducer";
import React from "react";
import { withAuthRedirect } from './../../hoc/WithAuthRedirect';
import { compose } from "redux";



class UsersAPIComponent extends React.Component {

	componentDidMount() {
		this.props.getUsersThunk(this.props.currentPage, this.props.usersOnPage);
	}

	onLoadClick() {
		this.props.loadMoreUsersThunk(this.props.currentPage, this.props.usersOnPage);
	}

	render() {
			// debugger
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
		users: state.usersPage.users,
		totalUsers: state.usersPage.totalUsers,
		usersOnPage: state.usersPage.usersOnPage,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
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
	withAuthRedirect)(UsersAPIComponent);