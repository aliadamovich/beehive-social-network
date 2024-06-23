let initialState = {
	users: [
		{
			"id": 1,
			"name": "Leanne Graham",
			"username": "Bret",
			"email": "Sincere@april.biz",

		},
		{
			"id": 2,
			"name": "Ervin Howell",
			"username": "Antonette",
			"email": "Shanna@melissa.tv",
		},
		{
			"id": 3,
			"name": "Clementine Bauch",
			"username": "Samantha",
			"email": "Nathan@yesenia.net",
		},
		{
			"id": 4,
			"name": "Patricia Lebsack",
			"username": "Karianne",
			"email": "Julianne.OConner@kory.org",
		},
		{
			"id": 5,
			"name": "Chelsey Dietrich",
			"username": "Kamren",
			"email": "Lucio_Hettinger@annie.ca",
		},
		{
			"id": 6,
			"name": "Mrs. Dennis Schulist",
			"username": "Leopoldo_Corkery",
			"email": "Karley_Dach@jasper.info",
		},
		{
			"id": 7,
			"name": "Kurtis Weissnat",
			"username": "Elwyn.Skiles",
			"email": "Telly.Hoeger@billy.biz",
		},
		{
			"id": 8,
			"name": "Nicholas Runolfsdottir V",
			"username": "Maxime_Nienow",
			"email": "Sherwood@rosamond.me",
		},
		{
			"id": 9,
			"name": "Glenna Reichert",
			"username": "Delphine",
			"email": "Chaim_McDermott@dana.io",
		},
		{
			"id": 10,
			"name": "Clementina DuBuque",
			"username": "Moriah.Stanton",
			"email": "Rey.Padberg@karina.biz",
		}
	],
	photos: [
		{ id: 1, photo: 'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg?w=1200' },
		{ id: 2, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnIBb3pDED2IMNh5AxAKPlMZdQN6xw8Cg2g&usqp=CAU' },
		{ id: 3, photo: 'https://www.earth.com/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2023%2F12%2F13092349%2FFree-ranging-cats-960x640.jpg&w=3840&q=75' },
		{ id: 4, photo: 'https://cdn.theatlantic.com/thumbor/OgQgHFiqAd92pArI1zjmcUHjoSc=/144x0:2411x1700/1200x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg' },
		{ id: 5, photo: 'https://www.shutterstock.com/image-photo/funny-british-shorthair-cat-portrait-600nw-2097266809.jpg' },
		{ id: 6, photo: 'data:image/jpeg;base64,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' },
		{ id: 7, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VDqwLyCDj0sGQM5Y5Y8i88Yy6xzz4GPC_A&usqp=CAU' },
		{ id: 8, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YIGV8GTRHiW_KACLMhhi9fEq2T5BDQcEyA&usqp=CAU' },
		{ id: 9, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDim25Sj5loXJbpYM0NKMZI2geNtFbDme5A&usqp=CAU' },
		{ id: 10, photo: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-08/220805-domestic-cat-mjf-1540-382ba2.jpg' }
	],
	messages: [
		{
			"postId": 1,
			"id": 1,
			"name": "id labore ex et quam laborum",
			"email": "Eliseo@gardner.biz",
			"body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
		},
		{
			"postId": 1,
			"id": 2,
			"name": "quo vero reiciendis velit similique earum",
			"email": "Jayne_Kuhic@sydney.com",
			"body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
		},
		{
			"postId": 1,
			"id": 3,
			"name": "odio adipisci rerum aut animi",
			"email": "Nikita@garfield.biz",
			"body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
		},
		{
			"postId": 1,
			"id": 4,
			"name": "alias odio sit",
			"email": "Lew@alysha.tv",
			"body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
		},
		{
			"postId": 1,
			"id": 5,
			"name": "vero eaque aliquid doloribus et culpa",
			"email": "Hayden@althea.biz",
			"body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
		},
		{
			"postId": 2,
			"id": 6,
			"name": "et fugit eligendi deleniti quidem qui sint nihil autem",
			"email": "Presley.Mueller@myrl.com",
			"body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
		},
		{
			"postId": 2,
			"id": 7,
			"name": "repellat consequatur praesentium vel minus molestias voluptatum",
			"email": "Dallas@ole.me",
			"body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
		},
		{
			"postId": 2,
			"id": 8,
			"name": "et omnis dolorem",
			"email": "Mallory_Kunze@marie.org",
			"body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
		},
		{
			"postId": 2,
			"id": 9,
			"name": "provident id voluptas",
			"email": "Meghan_Littel@rene.us",
			"body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
		},
		{
			"postId": 2,
			"id": 10,
			"name": "eaque et deleniti atque tenetur ut quo ut",
			"email": "Carmen_Keeling@caroline.name",
			"body": "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
		},
		{
			"postId": 3,
			"id": 11,
			"name": "fugit labore quia mollitia quas deserunt nostrum sunt",
			"email": "Veronica_Goodwin@timmothy.net",
			"body": "ut dolorum nostrum id quia aut est\nfuga est inventore vel eligendi explicabo quis consectetur\naut occaecati repellat id natus quo est\nut blanditiis quia ut vel ut maiores ea"
		},
	],
	newMessageText: '',
}

export const dialogReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'UPDATE-NEW-MESSAGE-TEXT':
			// state.newMessageText = action.body;
			return {
				...state,
				newMessageText: action.body
			}

		case 'ADD-MESSAGE':
			let newMsg = {
				"postId": 1,
				"id": 11,
				"name": state.newMessageText,
				"email": "Eliseo@gardner.biz",
				"body": 'abfhds'
			}
			// state.messages = [...state.messages, newMsg]
			// state.newMessageText = '';
			return {
				...state,
				messages: [...state.messages, newMsg],
				newMessageText: ''
			}

		default: return state

	}
}

export const updateNewMessageTextActionCreator = (msg) => ({
	type: 'UPDATE-NEW-MESSAGE-TEXT',
	body: msg
})
export const sendNewMessageActionCreator = () => ({ type: 'ADD-MESSAGE' })