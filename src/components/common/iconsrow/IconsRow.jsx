import { Icon } from "../Icon"
import styled from "styled-components";
export const IconsRow = () => {
	return (
		<IconsContainer>
			<Icon iconId='music' fill='none' width='24' height='24' viewBox='0 0 24 24' />
			<Icon iconId='camera' />
			<Icon iconId='play' fill='none' />
			<Icon iconId='smile' fill='none' />
			<Icon iconId='filter' fill='none' />
		</IconsContainer>
	)
}

const IconsContainer = styled.div`
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: flex-start;
		color: #111010;
		svg {
			width: 20px;
			height: 20px;
			cursor: pointer;
			&:hover {
					opacity: 0.8;
				}
		}
`