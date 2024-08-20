import React from 'react'
import { Icon } from '../../common/Icon';
import styled from 'styled-components';

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
					className={activeTab === tab.tab ? 'active' : ''}
					key={tab.id}>{tab.tab}

					<Icon iconId={tab.icon} fill='none' width='20px' height='20px' viewBox='0 0 24 24'/>
				</StyledTabItem>
			})}
		</>
	)
}


const StyledTabItem = styled.li`
	display: flex;
	flex-direction: column;
	svg{
		stroke: currentColor;
	}
	&:hover{
		stroke: #fff;
	}
`