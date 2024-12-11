import { Card, Divider, Skeleton } from 'antd';
import { AppStatusType } from '../../../redux/reducers/appReducer';
import styled from 'styled-components';
import { AppStateType } from '../../../redux/redux-store';
import { useSelector } from 'react-redux';
import { GridWrapper } from '../../common/GridWrapper';
import { Container } from '../../common/Container';
import { myTheme } from '../../../styles/Theme';


export const UsersSkeleton = () => {
	return (
		// <Container>
		// 	<SkeletonSearchContainer >
		// 		<SkeletonSearch></SkeletonSearch>
		// 		<Skeleton.Avatar/>
		// 	</SkeletonSearchContainer>
			<StyledSkeletonUsersContainer>
				<GridWrapper gap='15px' gtc='repeat(auto-fit, minmax(250px, 1fr))'>
				{Array(9).fill(null).map((el, i) => <UserSkeleton key={i}/>)}
				</GridWrapper>
				<Card loading bordered={false}/>
			</StyledSkeletonUsersContainer>
		// </Container>
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


const StyledUserTop = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`
const SkeletonSearchContainer = styled.div`
	width: 100%;
	margin: 20px 0%;
	display: flex;
	gap: 10px;
`
const SkeletonSearch = styled.div`
	background-color: rgba(0, 0, 0, 0.06);
	width: 100%;
	border-radius: 20px;
	height: 40px;
`

const StyledSkeletonUsersContainer = styled.div`
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
`