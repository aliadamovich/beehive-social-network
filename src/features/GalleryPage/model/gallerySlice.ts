import { createSlice } from "@reduxjs/toolkit";
import img1 from "assets/images/gallery/oo-verthing-rlMVmhBSP8k-unsplash.jpg"
import img2 from "assets/images/gallery/david-miller-0n12AlG-umA-unsplash.jpg"
import img3 from "assets/images/gallery/filip-rankovic-grobgaard-mY2SFFAotDQ-unsplash.jpg"
import img4 from "assets/images/gallery/kiarash-mansouri-TlNfasYsvXc-unsplash.jpg"
import img5 from "assets/images/gallery/alex-moliski-lGsSjuLEo5k-unsplash.jpg"
import img7 from "assets/images/gallery/fabrizio-coco-LvLdV3L_iA8-unsplash.jpg"

export const gallerySlice = createSlice({
	name: "gallery",
	initialState: {
		photoGrid: [
			{ id: 1, photo: img1 },
			{ id: 2, photo: img2 },
			{ id: 3, photo: img3 },
			{ id: 4, photo: img4 },
			{ id: 5, photo: img5 },
			{ id: 6, photo: img7 },
		] as Array<PhotoGridType>,
	},
	reducers: (create) => ({}),
	selectors: {
		selectGallery: state => state.photoGrid
	},
})

export const galleryReducer = gallerySlice.reducer
export const {selectGallery} = gallerySlice.selectors

export type PhotoGridType = {
	id: number
	photo: string
}
