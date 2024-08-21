import React from 'react'
import { Icon } from '../../common/Icon';
import styled, { css } from 'styled-components';

export const ProfileTabs = ({ activeTab, setActiveTab }: {activeTab: string; setActiveTab: (tab: string) => void}) => {

	const tabsData = [
		{ id: 1, tab: 'Activity', icon: 'activity' },
		{ id: 2, tab: 'Profile', icon: 'profile_edit' },
		{ id: 3, tab: 'Friends', icon: 'friends' },
		{ id: 4, tab: 'Forums', icon: 'megaphone' },
		// { id: 5, tab: 'Groups', icon: 'users' },
		// { id: 6, tab: 'Media', icon: 'gallery' },
	]

	return (
		<>
			{tabsData.map(tab => {
				return <StyledTabItem
					onClick={() => { setActiveTab(tab.tab) }}
					active={activeTab === tab.tab}
					className={activeTab === tab.tab ? 'active' : ''}
					key={tab.id}>
						<span>{tab.tab}</span>

					<Icon iconId={tab.icon} fill='none' width='20px' height='20px' viewBox='0 0 24 24'/>
				</StyledTabItem>
			})}
		</>
	)
}
type StyledTabItemProps = {
	active: boolean
}

const StyledTabItem = styled.li<StyledTabItemProps>`
	padding: 5px;
	width: 60px;
	height: 60px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	transition: all 0.4s ease 0s;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	overflow: hidden;
	svg{
		stroke: currentColor;
		transition: all 0.3s ease 0s;
	}

	span {
		transform: translateY(0%);
		transition: all 0.3s ease 0s;
	}
	${props => props.active && css<StyledTabItemProps>`
		background: linear-gradient(to bottom right,rgb(189, 139, 237), rgb(129, 29, 222));
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		color: #fff;

		span {
		transform: translateY(-150%);
		}
		svg {
			transform: translateY(-50%);
			scale: 1.2;
			stroke: #fff;
		}
	`}
	&:hover{
		background: linear-gradient(to bottom right,rgb(189, 139, 237), rgb(129, 29, 222));
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		color: #fff;

		span {
		transform: translateY(-150%);
		}
		svg {
			transform: translateY(-50%);
			scale: 1.2;
			stroke: #fff;
		}
	}
`