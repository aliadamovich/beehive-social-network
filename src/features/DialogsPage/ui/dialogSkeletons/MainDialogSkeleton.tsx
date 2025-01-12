import styled, { css } from 'styled-components';
import { Skeleton } from 'antd';
import { myTheme } from 'styles/Theme';

export const MainDialogSkeleton = () => {

	return (
		<>
			<StyledMessages>
				{[...Array(9)].map((_, index) => <SingleDialogSkeleton key={index} fromMe={true}/>)}
				
			</StyledMessages>
			<StyledSendMessage>
					<StyledContent>
	
						<StyledMessageBody>
							<Skeleton.Input active size='large' />
							<Skeleton.Button active/>
						</StyledMessageBody>
	
					</StyledContent>
				</StyledSendMessage>
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
	padding: 8px 0;
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


const StyledSendMessage = styled.div`
	position: sticky;
	bottom: 0;
	border-top: 1px solid ${myTheme.colors.borderColor};
	width: 100%;
	padding-top: 20px;
	padding-bottom: 30px;
	background-color: ${myTheme.colors.whiteBackground};
`
const StyledContent = styled.div`
	padding: 0 20px;
`
const StyledMessageBody = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 8px;
	
	>div:first-child{
		flex: 0 0 80%;
		  span {
			display: block;
			width: 100% !important;
		 }
	}

	@media ${myTheme.media[768]} {
			flex-direction: column;
			align-items: start;
		}
		>div:first-child{
		width: 100%;
	}
`