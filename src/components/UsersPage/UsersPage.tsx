import { Search } from '../common/Search/Search';
import { Container } from '../common/Container';
import { Recent } from '../common/Recent/Recent';
import styled from 'styled-components';
import { Users } from './Users';


export const UsersPage = () => {
	return(
		<StyledUsers>
			<Container>
				<UsersContent>
					<UsersWrapper>
						<Search />
							<Users />
					</UsersWrapper>
					<Recent />
				</UsersContent>
			</Container>
		</StyledUsers>
	)
}

const StyledUsers = styled.section`
	height: 100%;
	width: 100%;
	overflow: auto;
`

const UsersContent = styled.div`
	display: flex;
	gap: 30px;
	>div:nth-child(2){
		flex: 1 1 auto;
		padding-top: 60px;
	}
`

const UsersWrapper = styled.div`
	flex: 0 1 70%;
`