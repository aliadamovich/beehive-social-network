import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Avatar } from '../../../common/components/Avatar';
import { MainButton } from '../../../common/components/MainButton';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/routes';
import styled from 'styled-components';
import { myTheme } from '../../../styles/Theme';
import { selectAuthorizedLoginId, selectIsAuth, setIsAuth } from 'features/LoginPage/model/authSlice';
import { useLogoutMutation } from 'features/LoginPage/api/authApi';
import { useAppDispatch } from 'app/hooks/hooks';
import { useGetProfileQuery } from 'features/ProfilePage/api/profileApi';

type HeaderPropsType ={
	collapsed: boolean
	setCollapsed: (value: boolean) => void
}


export const HeaderBlock = ({ collapsed, setCollapsed}: HeaderPropsType) => {
	const { Header } = Layout;
	const { token: { colorBgContainer }, } = theme.useToken();
	const isAuth = useSelector(selectIsAuth);
	const authUserId = useSelector(selectAuthorizedLoginId)
	const { data: profileData } = useGetProfileQuery(authUserId!, {skip: !authUserId})
	const [logout, {isLoading}] = useLogoutMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onLogoutHandler = () => {

		logout().then(() => {
			navigate(PATH.LOGIN)
			dispatch(setIsAuth({ isAuth: false, userId: undefined }))
		})
	}

	return (
		
		<Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
			<SiderButton
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
			/>
			<HeaderContainer>
				{isAuth ?
					<>
						{profileData?.photos.small && <Avatar photo={profileData?.photos.small} />}
						<MainButton onClick={onLogoutHandler} icon={<PoweroffOutlined />} children={'Log out'} loading={isLoading} />
					</>
					:
					<Link to={PATH.LOGIN}>
						<MainButton variant="link">Login</MainButton>
					</Link>
				}
			</HeaderContainer>
		</Header>
	)
}

const SiderButton = styled(Button)`
	font-size: 16px;
	width: 64px;
	height: 64px;

	@media ${myTheme.media[768]} {
		display: none;
	}
`

const HeaderContainer = styled.div`
	display: flex;
	gap: 30px;
	margin-right: 24px;
	align-items: center;

@media ${myTheme.media[768]} {
		flex: 1 1 auto;
		justify-content: end;
	}

	@media ${myTheme.media[576]} {
		gap: 20px;
	}
`
