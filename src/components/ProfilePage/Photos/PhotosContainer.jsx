import { connect } from "react-redux";
import { Photos } from "./Photos";

let mapStateToProps = (state) => {
	return {
		photoGreed: state.profilePage.photoGreed
	}
}

let mapDispatchToProps = () => {
	return {
		
	}
}

export const PhotosContainer = connect(mapStateToProps, mapDispatchToProps)(Photos)