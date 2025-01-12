import styled from 'styled-components';
import { Users } from './Users';
import { Container } from 'common/components/Container';


export const UsersPage = () => {

	return(
		<StyledUsers>
			<Container>
				<UsersWrapper>
					<Users />
				</UsersWrapper>
			</Container>
		</StyledUsers>
	)
}

const StyledUsers = styled.section`
	height: 100%;
	width: 100%;
	overflow: auto;
`


const UsersWrapper = styled.div`
width: 100%;
`