import { createSlice } from '@reduxjs/toolkit';
import { profileAPI } from 'apiDal/apiDal';
import { setAppStatus } from 'app/appSlice';
import { AppStateType, AppThunk } from 'app/store';
import { ResultCodes } from 'common/enums/enum';
import { PhotosType } from 'common/types/types';
import { ProfileType } from 'features/ProfilePage/api/profileApi.types';
import {v1} from 'uuid'

const mockPosts = [
	{
		"id": v1(),
		"type": "replied",
		"body": "Congrats with your new job, dear!",
		date: new Date()
	},
	{
		"id": v1(),
		"type": "posted a new activity comment",
		"body": "Life is too short to be sorry..."
	},
	{
		"id": v1(),
		"type": "posted a new comment",
		"body": "Well... this is my first post here",
	},
	{
		"id": v1(),
		"type": "posted a new comment",
		"body": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
	},
]

//fake posts date

// utils/mockPosts.ts
// import { faker } from '@faker-js/faker';

// interface Post {
//   id: string;
//   author: string;
//   content: string;
//   date: Date;
//   likes: number;
//   comments: number;
// }

// export const generateMockTimeline = (count: number): Post[] => {
//   const posts: Post[] = [];
//   let currentDate = new Date(); // Начинаем с текущей даты
  
//   for (let i = 0; i < count; i++) {
//     // Уменьшаем дату для каждого следующего поста
//     currentDate = new Date(currentDate.getTime() - faker.datatype.number({ 
//       min: 3600000, // 1 час
//       max: 259200000 // 3 дня
//     }));
    
//     posts.push({
//       id: faker.datatype.uuid(),
//       author: faker.name.fullName(),
//       content: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 3 })),
//       date: currentDate,
//       likes: faker.datatype.number(1000),
//       comments: faker.datatype.number(100),
//     });
//   }
  
//   // Сортируем по дате (новые сначала)
//   return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
// };
// const PostCard: React.FC<{ post: Post }> = ({ post }) => {
//   return (
//     <div className="post-card">
//       <div className="post-header">
//         <h3>{post.author}</h3>
//         <time>{format(post.date, 'dd MMM yyyy, HH:mm')}</time>
//       </div>
//       <p>{post.content}</p>
//       <div className="post-stats">
//         <span>❤️ {post.likes}</span>
//         <span>💬 {post.comments}</span>
//       </div>
//     </div>
//   );
// };

// export const Timeline = () => {
//   const [posts, setPosts] = React.useState<Post[]>([]);

//   React.useEffect(() => {
//     // Генерируем 10 постов при монтировании
//     setPosts(generateMockTimeline(10));
//   }, []);

//   return (
//     <div className="timeline">
//       {posts.map(post => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </div>
//   );
// };




export const profileSlice = createSlice({
	name: "profile",
	initialState: {
		userProfile: null as ProfileType | null,
		userStatus: "",
		posts: mockPosts as Array<PostType>,
	},
	reducers: (create) => ({
		addPost: create.reducer<{ post: string }>((state, action) => {
			const newPost = {
				id: v1(),
				type: "posted a new comment",
				body: action.payload.post,
			}
			state.posts.unshift(newPost)
		}),
		setUserProfile: create.reducer<{ profile: ProfileType }>((state, action) => {
			state.userProfile = action.payload.profile
		}),
		setStatus: create.reducer<{ status: string }>((state, action) => {
			state.userStatus = action.payload.status
		}),
		setProfilePhoto: create.reducer<{ photos: PhotosType }>((state, action) => {
			if (state.userProfile) state.userProfile.photos = action.payload.photos
		}),
	}),

	selectors: {
		selectPosts: (state) => state.posts,
		selectProfileInfo: (state) => state.userProfile,
		selectUserStatus: (state) => state.userStatus,
	},
})
export const profileReducer = profileSlice.reducer;
export const {addPost, setProfilePhoto, setStatus, setUserProfile} = profileSlice.actions
export const { selectPosts, selectUserStatus, selectProfileInfo} = profileSlice.selectors

//* Thunks
// export const getUserProfileThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
//   return async (dispatch) => {
// 		dispatch(setAppStatus({status: 'loading'}));
// 		profileAPI.setProfile(profileId)
// 			.then((resp) => {
// 				dispatch(setUserProfile({profile: resp.data}));
// 				return resp.data.userId
// 			})
// 			.then((userId) => {
// 				dispatch(getStatusThunkCreator(userId))
// 				dispatch(setAppStatus({status: 'success'}))
// 			})
//   };
// };

// export const getStatusThunkCreator = (profileId: number): AppThunk<Promise<void>> => {
//   return async (dispatch) => {
 
//   //  dispatch(setAppStatus({status: 'loading'}));
//    return profileAPI.getStatus(profileId).then((resp)=> {
//    dispatch(setStatus({status: resp.data}));
//   //  dispatch(setAppStatus({status: 'success'}));
// 	 })
//   };
// };

// export const updateStatusThunkCreator = (status: string): AppThunk => {
// 	return async (dispatch) => {
// 		const resp = await profileAPI.updateStatus(status)
// 		if (resp.data.resultCode === ResultCodes.Success) {
// 			dispatch(setStatus({status}))
// 		}
// 	}
// }


// export const updateProfilePhotoThunkCreator = (file: any): AppThunk => {
//   return async (dispatch) => {
// 		try {
// 			dispatch(setAppStatus({status: 'loading'}));
// 			const resp = await profileAPI.setProfilePhoto(file);
//       if (resp.data.resultCode === ResultCodes.Success) {
//         dispatch(setProfilePhoto({photos: resp.data.data.photos}));
// 				dispatch(setAppStatus({status: 'success'}));
//       } else {
// 				handleServerError(dispatch, resp.data)
// 			}
// 		} catch (error) {
// 			handleNetworkError(dispatch, error as {message: string})
// 		}
//   };
// };

//используем доп getState() чтобы получить доступ к другой части стейта и взять айди польз-ля
// export const updateProfileInfoTC = (formData: ProfileType): AppThunk => {
//   return async (dispatch, getState: () => AppStateType) => {
// 		dispatch(setAppStatus({ status: "loading" }))
//     const userId = getState().auth.profileData.userId;
// 		if (userId ) {
// 			try {
// 				let resp = await profileAPI.setProfileInfo(formData);
//         if (resp.data.resultCode === ResultCodes.Success) {
//           dispatch(getUserProfileThunkCreator(userId));
//         } else {
//           handleServerError(dispatch, resp.data);
//         }
// 			} catch (error) {
// 				handleNetworkError(dispatch, error as { message: string });
// 			}
// 		}
//   };
// };



//* Types

type PostType = {
	id: string
	type: string
	body: string
}