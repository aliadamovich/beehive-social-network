import React from 'react'
import styled from 'styled-components'
import { myTheme } from 'styles/Theme'
import { Icon } from 'common/components/Icon'
import { LoginDescription, LoginHeader} from 'features/LoginPage/ui/LoginPage'

export const LoginContentInformation = () => {
	return (
		<>
			<FormInfo>
				<LoginHeader fontSize="34px" color="#FFF">Join the club</LoginHeader>
				<LoginDescription color="#FFF">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</LoginDescription>
				<ClubList>
					<ClubItem>
						<SvgWrapper>
							<Icon iconId='laptop' viewBox="0 0 48 48" fill='#FFF' />
						</SvgWrapper>
						<InfoWrapper>
							<LoginHeader as='h3' fontSize='19px' color="#FFF">Community</LoginHeader>
							<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
						</InfoWrapper>
					</ClubItem>
					<ClubItem>
						<SvgWrapper>
							<Icon iconId='megaphone' viewBox="0 0 26 26" fill='#FFF' />
						</SvgWrapper>
						<InfoWrapper>
							<LoginHeader as='h3' fontSize='19px' color="#FFF">Your Photo Gallery</LoginHeader>
							<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
						</InfoWrapper>
					</ClubItem>
					<ClubItem>
						<SvgWrapper>
							<Icon iconId='news2' viewBox="0 0 50 50" fill='#FFF' />
						</SvgWrapper>
						<InfoWrapper>
							<LoginHeader as='h3' fontSize='19px' color="#FFF">Latest news</LoginHeader>
							<LoginDescription color="#FFF">At vero eos et accusamus et.</LoginDescription>
						</InfoWrapper>
					</ClubItem>
				</ClubList>
			</FormInfo>
		</>
	)
}

const FormInfo = styled.div`
	flex: 0 1 50%;
	background-color: ${myTheme.colors.accent};
	padding: 0 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	>*:not(:last-child) {
		margin-bottom: 20px;
	}

	@media ${myTheme.media[768]} {
		display: none;
	}
`

const ClubList = styled.ul`
>*:not(:last-child) {
	margin-bottom: 25px;
}`

const ClubItem = styled.li`
	display: flex;
	align-items: center;
	gap: 15px;
`

const SvgWrapper = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid #FFF;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 30px;
		height: 30px;
	}
`

const InfoWrapper = styled.div`
`