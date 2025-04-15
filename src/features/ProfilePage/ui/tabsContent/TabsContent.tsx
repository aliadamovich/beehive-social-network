import { useSafeUserId } from 'app/hooks/useSafeUserId'
import { ProfileProps } from 'features/ProfilePage/lib/profilePropsType'
import { TABS } from 'features/ProfilePage/lib/tabsEnum'
import { FollowedFriends } from 'features/ProfilePage/ui/tabsContent/followedFriends/FollowedFriends'
import { PostsFeed } from 'features/ProfilePage/ui/tabsContent/postsFeed/PostsFeed'
import { ProfileInfoSection } from 'features/ProfilePage/ui/tabsContent/profileInfo/ProfileInfoSection'
import React from 'react'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'

type Props = {
	activeTab: TABS
}

export const TabsContent = ({ activeTab}: Props) => {
	const { isOwner } = useSafeUserId()

	const renderTabContent = () => {
		switch (activeTab) {
			case TABS.ACTIVITY:
				return <PostsFeed />
			case TABS.PROFILE:
				return <ProfileInfoSection />
			case TABS.FRIENDS:
				return <FollowedFriends />
			case TABS.GROUPS:
				return <div>Here will be Groups</div>
			default:
				return <PostsFeed />
		}
	}
	return (
		<StyledTabsContent>
			{renderTabContent()}
		</StyledTabsContent>
	)
}

const StyledTabsContent = styled.div`
	padding: 20px 20px 0;
	border: 1px solid ${myTheme.colors.borderColor};
	border-bottom: none;
	border-right: none;

	@media ${myTheme.media[576]} {
		padding: 20px 0;
	}
`