import React from "react";
import { Skeleton, Row, Col, Avatar, Button, Card, Typography, Space } from "antd";
import { StyledProfileBottom, StyledProfileTop } from "../ProfilePage";
import { UserStyledPhoto } from "../ProfileUser/ProfilePhoto";
import { Container } from "../../../../common/components/Container";
import styled from "styled-components";
import { myTheme } from "../../../../styles/Theme";
import { StyledProfileUser } from "features/ProfilePage/ui/ProfileUser/ProfileUser";
import { TabsContainer, TabsList } from "features/ProfilePage/ui/tabs/ProfileNavigation";

export const ProfileSkeleton = () => {



	return (
		<div >

			<StyledSkeletonBackground>
			</StyledSkeletonBackground>
	
			<Container>
				<StyledProfileTop>
					
					<StyledProfileUser >
						<UserStyledPhoto>
							<Skeleton.Image style={{ width: "240px", height: '240px', borderRadius: '8px' }} />
						</UserStyledPhoto>
							<Skeleton.Input style={{ width: 150, height: 30, display: 'block'}} active />
					</StyledProfileUser>
	
					<TabsContainer>
							<TabsList>

							{[...Array(4)].map((_, index) => (
								<StyledTabsButtons key={index}>
									<Skeleton.Button active />
								</StyledTabsButtons>
							))}
							</TabsList>
					</TabsContainer>
				</StyledProfileTop>
	
	
				{/* Bottom */}
				<StyledProfileBottom >
	
					<SkeletonGallery>
						{[...Array(6)].map((_, index) => (
							<div key={index}>
									<Skeleton.Image style={{ width: "100%", height: '80px', padding: '10px' }} />
								</div>
						))}
					</SkeletonGallery>
		
					<Card title={
						<StyledSkeletonFeed>
							<Skeleton.Input active />
							<Skeleton.Button active style={{ maxWidth: 100 }} />
						</StyledSkeletonFeed>} style={{margin: '20px 30px 10px' }}>
						{[...Array(4)].map((_, index) => (
							<Row align="middle" key={index} style={{ marginBottom: 20, width: '100%' }}>
								<Avatar size={40} style={{ backgroundColor: "#f0f0f0", marginRight: 10, marginBottom: 10 }} />
								<div style={{ display: 'flex', flexDirection: "column", flex: '1 1 auto' }}>
									<Skeleton.Input style={{ width: 80, height: 15 }} active />
									<Skeleton.Input style={{  height: 20, marginBottom: 5, width: '100%' }} active />
								</div>
							</Row>
						))}
					</Card>
		
					<SkeletonActivity>
						<Card title={<Skeleton.Input style={{ width: 150 }} active />} >
							{[...Array(3)].map((_, index) => (
								<Row key={index} style={{ marginBottom: "20px", width: '100%' }}>
									<Avatar size={40} style={{ backgroundColor: "#f0f0f0", marginBottom: 10 }} />
									<div style={{ display: 'flex', gap:'10px' }}>
										<Skeleton.Input style={{ height: 20}} active />
									</div>
								</Row>
							))}
						</Card>
					</SkeletonActivity>
				</StyledProfileBottom>
			</Container>
		</div>
	)
};

const StyledTabsButtons = styled.li`
width: 60px;
height: 60px;
display: inline-block;
>div {
	height: 100%;
	width: 100% !important;
	span {
		width: 100% !important;
		height: 100% !important;
		display: inline-block !important;
		min-width: 50px !important;
	}
}

 @media ${myTheme.media[576]} {
		width: 50px;
		height: 50px;
	}
`
const StyledSkeletonBackground = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	
		&::before{
			content: '';
			position: absolute;
			width: 100%;
			top: 0px;
			left: 0;
			right: 0;
			height: 250px;
			background: rgb(240, 240, 240); 
			border-radius: 8px;
		}
`
const StyledSkeletonFeed = styled.div`
display: flex;
justify-content: space-around;

@media ${myTheme.media[576]} {
		 div:nth-child(2){
				display: none !important;
		 }
		
		
	}
`
const SkeletonGallery = styled.div`
	padding: 0 20px 0;
	display: grid;
	gap: 10px;
	margin-top: 20px;
	grid-template: 80px / repeat(3, 1fr);
		@media ${myTheme.media[950]} {
		display: none;
	}
`

const SkeletonActivity = styled.div`
	margin-top: 20px;
	@media ${myTheme.media[1350]} {
		display: none;
	}
`