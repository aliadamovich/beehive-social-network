import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import logo_1 from 'assets/images/logo.png';
import logo_2 from 'assets/images/logo_login.svg';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { myTheme } from 'styles/Theme';
import { LoginForm } from 'features/LoginPage/ui/LoginForm';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'features/LoginPage/model/authSlice';
import { PATH } from 'routes/routes';

type Props = {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}


export const SiderBar = ({ collapsed, setCollapsed }: Props ) => {
	const { Sider } = Layout;
	const location = useLocation();
	const isAuth = useSelector(selectIsAuth);
	const { userId } = useParams();

	const menuItems = [
		{
			key: '/profile',
			icon: <UserOutlined />,
			label: <Link to={PATH.ROOT}>Profile</Link>,
		},
		{
			key: '/dialogs',
			icon: <MessageOutlined />,
			label: <Link to={PATH.DIALOGS}>Dialogs</Link>,
		},
		{
			key: '/users',
			icon: <UsergroupAddOutlined />,
			label: <Link to={PATH.USERS}>Users</Link>,
		},
		{
			key: '/gallery',
			icon: <CameraOutlined />,
			label: <Link to={PATH.GALLERY}>Gallery</Link>,
		},
		{
			key: '/chat',
			icon: <SmileOutlined />,
			label: <Link to={PATH.CHAT}>Live Chat</Link>,
		},
	];
	const siderStyle: React.CSSProperties = {
		overflow: 'auto',
		height: '100vh',
		position: 'fixed',
		insetInlineStart: 0,
		top: 0,
		bottom: 0,
		scrollbarWidth: 'thin',
		scrollbarColor: 'unset',
		background: `${myTheme.colors.siderBackground}`
	};

	return (
		<Sider
			theme="dark"
			trigger={null} collapsible={false} collapsed={collapsed}
			breakpoint="lg"
			style={siderStyle}
			onBreakpoint={(broken) => setCollapsed(broken)}
		>
			<div className="demo-logo-vertical" />

			<StyledLogo to={isAuth ? PATH.PROFILE : `${PATH.PROFILE}/${userId}`} $collapsed={collapsed}>
				<img src={collapsed ? logo_1 : logo_2} alt="logo" />
			</StyledLogo>
			{isAuth ?
				<StyledMenu
					theme="dark" mode="inline"
					selectedKeys={[location.pathname]}
					style={{ background: `${myTheme.colors.siderBackground}` }}
					items={menuItems}
				>
				</StyledMenu>
				:
				<StyledMiniLoginForm collapsed={collapsed}>
					<LoginForm />
				</StyledMiniLoginForm>
			}

		</Sider>
	)
}


const StyledMenu = styled(Menu)`
  .ant-menu-item-selected {
    background: ${myTheme.colors.gradient};
  }
`;

const StyledLogo = styled(Link)<{ $collapsed: boolean }>`
	display: block;
	text-align: center;
	margin: 10px 0 40px;
	img {
		width: ${ ({ $collapsed }) => ($collapsed ? '50px' : '150px') };
		height: 50px;
	}
`

const StyledMiniLoginForm = styled.div<{ collapsed: boolean }>`
	background-color: #fff;
	border-radius: 8px;
	margin: 10px;
	padding: 10px;
	
	${props => props.collapsed && css<{ collapsed: boolean }>`
	display: none;
`}
`