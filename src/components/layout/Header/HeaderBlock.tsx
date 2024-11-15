import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutThunkCreator } from '../../../redux/reducers/authReducer';
import { getLogin, getAuthUserPhotos } from '../../../redux/selectors/header-selectors';
import { AppDispatch, AppStateType } from '../../../redux/redux-store';
import { Avatar } from '../../common/Avatar';
import { FlexWrapper } from '../../common/FlexWrapper';
import { MainButton } from '../../common/MainButton';
import { IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../routes/routes';

type HeaderPropsType ={
	collapsed: boolean
	setCollapsed: (value: boolean) => void
}


export const HeaderBlock = ({ collapsed, setCollapsed}: HeaderPropsType) => {
	const { Header } = Layout;
	const { token: { colorBgContainer }, } = theme.useToken();
	const login = useSelector(getLogin);
	const photos = useSelector(getAuthUserPhotos)
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>()
	const isAuth = useSelector<AppStateType>(state => state.auth.isAuth);

	const onLogoutHandler = () => {
		setLoading(true)
		dispatch(LogoutThunkCreator()).then(() => {
			setLoading(false)
		})
	}

	return (
		
		<Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
		<>
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: '16px',
					width: 64,
					height: 64,
				}}
			/>
			<div style={{ display: 'flex', gap: '40px', marginRight: '24px', alignItems: 'center' }}>
				<FlexWrapper gap='10px' align='center'>
					<span>{login}</span>
					{photos?.small && <Avatar photo={photos.small} />}
				</FlexWrapper>

				{isAuth ?
					<MainButton onClick={onLogoutHandler} icon={<PoweroffOutlined />} children={'Log out'} loading={loading} />
					:
					<Link to={PATH.LOGIN}>
						<Button variant="link">Login</Button>
					</Link>
				}
				
			</div>
		</>
		</Header>
	)
}

