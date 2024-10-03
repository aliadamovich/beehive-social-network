import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from "styled-components";
import { myTheme } from "./Theme";


export const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
height: 100%;

}
	body {
		margin: 0;
		font-family: ${myTheme.fonts.main} ;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 14px;
		font-weight: 400;
		line-height: 120%;
		color: ${myTheme.colors.mainFontColor};
		min-width: 375px;
		height: 100%;
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
	/* border: none; */
	}

	h1, h2, h3, h4, h5, h6 {
	font-size: inherit;
	font-weight: 400;
	}


	*:focus-visible {
    outline: 1px solid #edf1f5;
}
`;