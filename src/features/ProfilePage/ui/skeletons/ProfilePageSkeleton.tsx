import React from "react";
import { Skeleton, Row, Col, Avatar, Button, Card, Typography, Space } from "antd";
import { GridProfileUser, StyledProfileBottom, StyledProfileTop, TabsMenu } from "../ProfilePage";
import { UserStyledPhoto } from "../ProfilePhoto";
import { Container } from "../../../../common/components/Container";
import styled from "styled-components";
import { myTheme } from "../../../../styles/Theme";

export const ProfileSkeleton = () => {
	return (
		<div style={{ padding:' 20px', width: '100%' }}>

			<StyledSkeletonBackground>
			</StyledSkeletonBackground>
	
			<Container>
				<StyledProfileTop>
					
					<GridProfileUser style={{}}>
						<UserStyledPhoto>
							<Skeleton.Image style={{ width: "240px", height: '240px', borderRadius: '8px' }} />
						</UserStyledPhoto>
							<Skeleton.Input style={{ width: 150, height: 30, display: 'block'}} active />
					</GridProfileUser>
	
					<TabsMenu>
							<ul>
								<li >
									<Skeleton.Button active style={{ width: 60, height: 60 }} />
								</li>
								<li >
									<Skeleton.Button active style={{ width: 60, height: 60 }} />
								</li>
								<li >
									<Skeleton.Button active style={{ width: 60, height: 60 }} />
								</li>
								<li >
									<Skeleton.Button active style={{ width: 60, height: 60 }} />
								</li>
							</ul>
					</TabsMenu>
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
						<div style={{display: 'flex', justifyContent:'space-around'}}>
							<Skeleton.Input active />
							<Skeleton.Button active style={{ width: 100 }} />
						</div>} style={{margin: '20px 30px 0' }}>
						{[...Array(4)].map((_, index) => (
							<Row align="middle" key={index} style={{ marginBottom: 20, width: '100%' }}>
								<Avatar size={40} style={{ backgroundColor: "#f0f0f0", marginRight: 10 }} />
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

const SkeletonGallery = styled.div`
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