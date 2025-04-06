import styled, { css } from "styled-components";

export const SectionTitle = styled.h2<{textAlignCenter?: boolean}>`
	font-family: "Quicksand";
	font-size: 20px;
	font-weight: 700;
	color: rgb(79, 81, 91);
	margin-bottom: 20px;

	${props => props.textAlignCenter && css<{textAlignCenter?: boolean}>`
		text-align: center;
	`}
`