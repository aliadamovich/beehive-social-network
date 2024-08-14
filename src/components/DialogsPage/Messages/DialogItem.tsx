import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../../common/Avatar';

type DialogItemPropsType = {
	name: string
	id: number
	photo: string | null
}

export const DialogItem = (props: DialogItemPropsType) => {

	let path = `/dialogs/${props.id}`;

	return (
		<NavLink to={path}>
			<StyledDialog>
				<Avatar photo={props.photo} width='50px' height='50px' />
				<StyledName>
					{props.name}
					<span>@{props.name}</span>
				</StyledName>
			</StyledDialog>
		</NavLink>
	)
}


const StyledDialog = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`

const StyledName = styled.div`
	font-family: "Quicksand", sans-serif;
	font-size: 17px;
	font-weight: 700;
	color: rgb(79, 81, 91);
	span {
		display: block;
		font-size: 13px;
		opacity: 0.9;
		font-weight: 400;
		margin-top: 5px;
	}
`