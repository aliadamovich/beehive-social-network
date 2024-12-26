import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Avatar } from '../../../common/Avatar';
import { PATH } from '../../../../routes/routes';
import { Skeleton } from 'antd';
import { myTheme } from '../../../../styles/Theme';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';

type SideDialogItemPropsType = {
	name: string
	id: number
	photo: string | null
}


export const SideDialogItem = (props: SideDialogItemPropsType) => {
	
	const appStatus = useSelector<AppStateType>(state => state.app.status);
	let path = `${PATH.DIALOGS}/${props.id}`;
	const {id} = useParams();

	return (
		<StyledNavLink to={path}>
			<StyledDialog active={Number(id) === props.id}>
				<Skeleton loading={appStatus === 'loading'} active avatar={{ style: {width: '50px', height: '50px'} }}
					title={{ style: { marginTop: 4 } }} paragraph={{ rows: 1, style: { marginTop: 12 } }}>

					<Avatar photo={props.photo} width='50px' height='50px' />
					<StyledName>
						{props.name}
						<span>@{props.name}</span>
					</StyledName>

				</Skeleton >
			</StyledDialog>

		</StyledNavLink>
	)
}

const StyledNavLink = styled(NavLink)`
	padding: 0 5px;
	max-width: 250px;
	@media ${myTheme.media[768]} {
		max-width: 100%;
	}
`

const StyledDialog = styled.div<{active: boolean}>`
	display: flex;
	align-items: center;
	gap: 20px;
	transition: all 0.3s ease 0s;
	padding: 5px;
	border-radius: 8px;
	&:hover{
		background-color: #ae73e688;
	}

	${props => props.active && css<{ active: boolean }>`
		background-color: #ae73e688;
	`}
`

const StyledName = styled.div`
	font-family: ${myTheme.fonts.secondary};
	font-size: 17px;
	font-weight: 700;
	
	span {
		display: block;
		font-size: 13px;
		opacity: 0.9;
		font-weight: 400;
		margin-top: 5px;
	}
`