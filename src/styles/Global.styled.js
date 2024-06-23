import { createGlobalStyle } from "styled-components";
import { theme } from "./Theme";


export const GlobalStyles = createGlobalStyle`
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	*::selection {
		background-color: ${theme.colors.accent}
	}


	body {
		margin: 0;
		font-family: "Nunito Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 24px;
		font-weight: 400;
		line-height: 120%;
		color: ${theme.colors.mainFont};
		min-width: 375px;

		&.lock {
			overflow: hidden;
		}
	}
	
	a {
		text-decoration: none;
		&:hover{
			text-decoration: none;
		}
	}
	
	ul {list-style: none}
	
	button {
	cursor: pointer;
	background-color: unset;
	border: none;
	}

	h1, h2, h4, h5, h6 {
	font-size: inherit;
	font-weight: 400;
	}
	h3 {
	
	}
	
	input,
	button,
	textarea {
		font-family: inherit;
	}

`