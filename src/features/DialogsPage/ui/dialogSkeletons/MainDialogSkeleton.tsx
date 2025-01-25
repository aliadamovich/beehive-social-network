import styled, { css } from 'styled-components';
import { Skeleton } from 'antd';
import { myTheme } from 'styles/Theme';

export const MainDialogSkeleton = () => {

	return (
		<>
			<StyledMessages>
				<SingleDialogSkeleton fromMe={true}/>
				<SingleDialogSkeleton fromMe={false}/>
				<SingleDialogSkeleton fromMe={false}/>
				<SingleDialogSkeleton fromMe={true}/>
				<SingleDialogSkeleton fromMe={false}/>
				{/* {[...Array(9)].map((_, index) => <SingleDialogSkeleton key={index} fromMe={true}/>)} */}
			</StyledMessages>
		</>
	)
}

export const SingleDialogSkeleton = ({fromMe}: {fromMe: boolean}) => {

	return (
		<StyledMessage fromMe={fromMe}>
			<Skeleton.Avatar size='large' active/>
			<StyledTextBox fromMe={fromMe} />
		</StyledMessage>
	)
}
const StyledMessages = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 10px;
`

const StyledMessage = styled.div<{ fromMe: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: end;
	gap: 20px;
	padding: 10px 0;
	>:first-child{
		flex: 0 0 50px;
	}
	${props => props.fromMe && css<{ fromMe: boolean }>`
		flex-direction: row-reverse;
	`}
	@media ${myTheme.media[576]} {
		gap: 8px;
		>:first-child{
		width: 40px;
		height: 40px;
		flex: 0 0 40px;
	}
	}
`

const StyledTextBox = styled.div<{ fromMe: boolean }>`
	position: relative;
	box-shadow: 0px 1px 2px 0px rgba(29, 33, 38, 0.1), 0px 5px 20px 0px rgba(29, 33, 38, 0.03);
	background: rgb(239, 239, 239);
	padding: 10px;
	border-radius: 8px;
	min-width: 200px;
	width: 100%;
	
	min-height: 60px;
	&::before {
		content: "";
		position: absolute;
		left: -5px;
		bottom: -5px;
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 10px solid rgb(239, 239, 239);
		transform: rotate(-90deg);
	}
	${props => props.fromMe && css<{ fromMe: boolean }>`
		&::before {
			left: none;
			right: -5px;
			left: unset;
		}
	`}

	@media ${myTheme.media[576]} {
		padding: 5px;
	}
`
