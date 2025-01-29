import { Icon } from '../../../../common/components/Icon';
import styled, { css } from 'styled-components';
import { myTheme } from '../../../../styles/Theme';
import { TABS } from 'features/ProfilePage/lib/tabsEnum';

type Props = {
	activeTab: string
	setActiveTab: (tab: TABS) => void
}

export const ProfileTabs = ({ activeTab, setActiveTab }: Props) => {

	const tabsData = [
		{ id: 1, tab: TABS.ACTIVITY, icon: 'activity' },
		{ id: 2, tab: TABS.PROFILE, icon: 'profile_edit' },
		{ id: 3, tab: TABS.FRIENDS, icon: 'friends' },
		{ id: 4, tab: TABS.GROUPS, icon: 'megaphone' },
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
	background-color: ${myTheme.colors.whiteBackground};
	transition: all 0.5s ease 0s;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	overflow: hidden;
	color: ${myTheme.colors.mainFontColor};
	text-transform: capitalize;
	svg{
		stroke: currentColor;
		transition: all 0.5s ease 0s;
	}

	span {
		transform: translateY(0%);
		transition: all 0.4s ease 0s;
	}

	${props => props.active && css<StyledTabItemProps>`
		background: ${myTheme.colors.gradient};
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		color: ${myTheme.colors.whiteFontColor};

		span {
		transform: translateY(-160%);
		}
		svg {
			transform: translateY(-40%);
			scale: 1.2;
			stroke: currentColor;
		}
	`}
	&:hover{
		background: ${myTheme.colors.gradient};
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		color: ${myTheme.colors.whiteFontColor};

		span {
		transform: translateY(-160%);
		color: ${myTheme.colors.whiteFontColor};
	}
		svg {
			transform: translateY(-40%);
			scale: 1.2;
			stroke: ${myTheme.colors.whiteFontColor};
		}
	}

	@media ${myTheme.media[576]} {
		width: 50px;
		height: 50px;
		font-size: 11px;
	}
`