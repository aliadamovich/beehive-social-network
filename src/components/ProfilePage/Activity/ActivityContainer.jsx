
import { Activity } from './Activity';
import {connect} from 'react-redux';

export const ActivityContainer = connect(mapStateToProps, mapDispatchToProps)(Activity);

function mapStateToProps(state) {
	return {
		posts: state.profilePage.posts
	}
}

function mapDispatchToProps() {
	return {}
}