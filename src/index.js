import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from './redux/redux-store'
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { GlobalStyles } from './styles/Global.styled';
import { BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

	root.render(

			<Provider store={store}>
				<GlobalStyles />
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>

	);


reportWebVitals();


