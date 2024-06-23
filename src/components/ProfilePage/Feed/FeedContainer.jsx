import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/reducers/profileReducer'
import { Feed } from './Feed';
import { connect } from 'react-redux';


let mapStateToProps = (state) => ({
	profilePage: state.profilePage,
})
 
let mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => { dispatch(addPostActionCreator()) },
		updatePostText: (text) => { dispatch(updateNewPostTextActionCreator(text)) }
	}
}
export const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed);

