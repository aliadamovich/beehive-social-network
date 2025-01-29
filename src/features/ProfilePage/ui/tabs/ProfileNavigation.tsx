import { MainButton } from "common/components/MainButton";
import { ProfileProps } from "features/ProfilePage/lib/profilePropsType";
import { TABS } from "features/ProfilePage/lib/tabsEnum";
import { ActionButtons } from "features/ProfilePage/ui/tabs/ActionButtons";
import { ProfileTabs } from "features/ProfilePage/ui/tabs/ProfileTabs"
import { FollowUserButton } from "features/UserPage/ui/FollowUserButton";
import { useState } from "react";
import styled from "styled-components";
import { myTheme } from "styles/Theme";

type Props = {
	activeTab: string
	setActiveTab: (tab: TABS) => void
	isOwner: boolean
}

export const ProfileNavigation = ({isOwner, ...props}: Props) => {
	
	return (
		<TabsContainer>
			<TabsMenu>
				<TabsList>
					<ProfileTabs {...props}/>
				</TabsList>
			</TabsMenu>

			{!isOwner && <ActionButtons />}

		</TabsContainer>
	)
}
export const TabsContainer = styled.div`
	display: flex;
	/* flex-direction: column; */
	justify-content: space-between;
	align-items: end;
	position: relative;
	z-index: 1;
	padding: 0 10px;

	@media ${myTheme.media[950]} {
		flex-direction: row-reverse;
		align-items: center;
	}
	@media ${myTheme.media[768]} {
		flex-direction: column-reverse;
		gap: 15px;
	}
`
 const TabsMenu = styled.nav`
	@media ${myTheme.media[950]} {
		flex: 1 1 auto;
	}
`

export const TabsList = styled.ul`
	display: flex;
	gap: 20px;

	@media ${myTheme.media[950]} {
		justify-content: center;
	}

	@media ${myTheme.media[576]} {
		gap: 10px;
	}
`

