import { TABS } from "features/ProfilePage/lib/tabsEnum";
import { ProfileTabsItems } from "features/ProfilePage/ui/tabs/ProfileTabsItems"
import { useState } from "react";
import styled from "styled-components";
import { myTheme } from "styles/Theme";

type Props = {
	activeTab: string
	setActiveTab: (tab: TABS) => void
}

export const ProfileTabs = (props: Props) => {
	
	return (
		<TabsMenu>
			<TabsList>
				<ProfileTabsItems {...props}/>
			</TabsList>
		</TabsMenu>
	)
}

const TabsMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: end;
	position: relative;
	z-index: 1;
`

const TabsList = styled.ul`
	display: flex;
	gap: 20px;

	@media ${myTheme.media[950]} {
		justify-content: center;
	}

	@media ${myTheme.media[576]} {
		gap: 10px;
	}
`