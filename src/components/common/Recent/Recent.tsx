import styled from 'styled-components';
import { Icon } from '../Icon';
import { SectionTitle } from '../SectionTitle';


export const Recent = () => {
	const recentData = [
		{ id: 1, name: "Patricia Lebsack" },
		{ id: 2, name: "Ervin Howell" },
		{ id: 3, name: "Leanne Graham" },
		{ id: 4, name: "Patricia Lebsack" },
		{ id: 5, name: "Kurtis Weissnat" }
	]
	const linksData = [
		{id: 1, href:'#', name: 'Home'},
		{ id: 2, href: '#', name: 'About us'},
		{ id: 3, href: '#', name: 'FAQs'},
		{ id: 4, href: '#', name: 'Blog'},
		{ id: 5, href: '#', name: 'Contact'},
	]
	return (
		<StyledRecentSection>
				<StyledContainer>
					<StyledRecentContent>
						<SectionTitle>Recent topics</SectionTitle>
						<ul>
							{recentData.map(d => {
								return <StyledRecentItem key={d.id}>
													<Icon iconId='topic' viewBox='0 -5.5 65 65' fill="none" />
													<span>{d.name}</span>
												</StyledRecentItem>
							})}
						</ul>
					</StyledRecentContent>
				</StyledContainer>
			<StyledNavigation>
				<ul>
					{linksData.map(l => {
						return <li key={l.id}><a href={l.href}>{l.name}</a></li>
					})}
				</ul>
			</StyledNavigation>
		</StyledRecentSection>
	)
}



const StyledRecentSection = styled.div`

	h2 {
		position: relative;
		padding-bottom: 15px;
		margin-bottom: 30px;

		&::after {
			content: '';
			position: absolute;
			width: 30%;
			height: 2px;
			bottom: 0px;
			left: 0;
			background: #8c30e2;

		}
	}
`

const StyledContainer = styled.div`
	background: linear-gradient(to top left, rgb(245, 239, 252), white 80%, rgb(249, 246, 252));
	padding: 30px 20px;
	border-radius: 8px;
`

const StyledRecentContent = styled.div`
	ul {
			>*:not(:last-child) {
				margin-bottom: 15px;
			}
		}
`

const StyledRecentItem = styled.li`
	cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;

		span {
			font-size: 18px;
			font-weight: 500;
			color: rgb(79, 81, 91);
		}

		svg {
			width: 15px;
			height: 15px;
			stroke-width: 2px;
		}
`

const StyledNavigation = styled.nav`
	margin-top: 13px;

		ul {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;

			li {
				font-size: 12px;

				a {
					color: rgb(125, 127, 136);
					transition: all 0.3s ease 0s;
					&:hover{
						color: #111010;
					}
				}
			}
		}
`