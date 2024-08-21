import styled from 'styled-components'

type GridWrapperPropsType = {
	gtc?: string
	gap?: string
	md?: string
}

export const GridWrapper = styled.div<GridWrapperPropsType>`
  display: grid;
 	grid-template-columns: ${props => props.gtc || 'repeat(3, 1fr)'};
  grid-auto-rows: 1fr;
  gap: ${(props) => props.gap || "0px"};

  @media (max-width: 1024px) {
    grid-template-columns: ${(props) => props.md};
  }
`;
