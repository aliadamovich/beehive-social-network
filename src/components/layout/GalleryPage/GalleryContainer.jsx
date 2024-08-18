import { Gallery } from "./Gallery";
import { connect } from "react-redux";
import React from "react";

class GalleryAPIComponent extends React.Component {
	render() {

		return (
			
			<Gallery photoGrid={this.props.photoGrid}/>
		)
	}
}


export const GalleryContainer = connect(mapStateToProps, mapDispatchToProps)(GalleryAPIComponent);

function mapStateToProps(state) {
	return {
		photoGrid: state.grid.photoGrid
	}
}

function mapDispatchToProps() {
	return {}
}