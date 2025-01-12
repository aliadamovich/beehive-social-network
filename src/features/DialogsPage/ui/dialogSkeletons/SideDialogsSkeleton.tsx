import { Skeleton } from "antd"
import styled from "styled-components"
import { myTheme } from "styles/Theme"

export const SideDialogsSkeleton = () => {
	return (
		<StyledSideContainer>
			{
				Array(9).fill(null).map((el, index) => (
					<div key={index}>
						<Skeleton avatar active
							title={false}
							paragraph={{ rows: 2, width: "60%" }} />
					</div>
				))
			}
		</StyledSideContainer>
	)
}

const StyledSideContainer = styled.div`
	flex: 0 0 25%;
	border-right: 1px solid ${myTheme.colors.borderColor};
	padding: 2px 10px;
	transform: translateX(0);
	>*:not(:last-child) {
		margin-bottom: 20px;
	}

	@media ${myTheme.media[950]} {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		flex: 0 0 100%;
		transition: transform 0.5s ease;
	}
`