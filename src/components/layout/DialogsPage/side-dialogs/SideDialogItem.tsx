import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../../../common/Avatar';

type SideDialogItemPropsType = {
	name: string
	id: number
	photo: string | null
}

export const SideDialogItem = (props: SideDialogItemPropsType) => {

	let path = `/dialogs/${props.id}`;

	return (
		<StyledNavLink to={path}>
			<StyledDialog>
				<Avatar photo={props.photo} width='50px' height='50px' />
				<StyledName>
					{props.name}
					<span>@{props.name}</span>
				</StyledName>
			</StyledDialog>
		</StyledNavLink>
	)
}

const StyledNavLink = styled(NavLink)`
	padding: 0 5px;
`

const StyledDialog = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	transition: all 0.3s ease 0s;
	padding: 5px;
	border-radius: 8px;
	&:hover{
		box-shadow: 2px 2px 5px 0px rgba(139, 139, 139, 0.31);
	}
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