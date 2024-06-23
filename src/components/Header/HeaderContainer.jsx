import React from 'react';
import { Header } from './Header';
import { connect } from 'react-redux';
import { getAuthUserDataThunkCreator } from '../../redux/reducers/authReducer';

class HeaderContainer extends React.Component {

	componentDidMount() {

		this.props.getAuthUserData()
	}
	render() {
		return <Header {...this.props} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

function mapStateToProps(state) {
	return {
		login: state.auth.autID.login,
		isAuth: state.auth.isAuth
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAuthUserData: () => dispatch(getAuthUserDataThunkCreator())
	}
}