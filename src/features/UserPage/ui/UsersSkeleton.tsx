import { Card, Divider, Skeleton } from 'antd';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { myTheme } from '../../../styles/Theme';
import { GridWrapper } from 'common/components/GridWrapper';


export const UsersSkeleton = ({ withoutSideBar }: { withoutSideBar?: boolean }) => {
	return (
		<StyledSkeletonUsersContainer withoutSideBar={withoutSideBar}>
			<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
			{Array(9).fill(null).map((el, i) => <UserSkeleton key={i}/>)}
			</GridWrapper>
			<Card loading bordered={false} />
		</StyledSkeletonUsersContainer>
	)
}

 const UserSkeleton = () => {
	
	return (
		<>
			<Card style={{overflow: 'hidden'}}>
				<StyledUserTop>
					<Skeleton avatar />
				</StyledUserTop>
				<Divider style={{margin: '12px 0'}}/>
				<Skeleton.Button active size='default' />
			</Card>
		</>
	)
}



const StyledSkeletonUsersContainer = styled.div<{ withoutSideBar?: boolean }>`
	overflow: hidden;
	padding: 20px 10px;
	border-top: 1px solid ${myTheme.colors.borderColor};
	display: flex;
	gap: 40px;
	
	>div:first-child {
			flex: 0 1 75%;
			padding-top: 40px;
		}
	>div:nth-child(2) {
		flex: 1 1 auto;
	}

	${props => props.withoutSideBar && css<{ withoutSideBar?: boolean }>`
		>div:first-child {
			flex: 1 1 100%;
			padding-top: 40px;
		}
		>div:nth-child(2) {
		display: none;
		}
	`}
`

const StyledUserTop = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`
