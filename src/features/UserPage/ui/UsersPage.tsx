import styled from 'styled-components';
import { Container } from 'common/components/Container';
import { Users } from 'features/UserPage/ui/Users';


export const UsersPage = () => {

	return(
		<StyledUsers>
			<Container>
				<UsersWrapper>
					<Users />
					{/* <InfiniteScrollList /> */}
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