import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import logo_1 from 'assets/images/logo.png';
import logo_2 from 'assets/images/logo_login.svg';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { myTheme } from 'styles/Theme';

type Props = {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}


export const SiderBar = ({ collapsed, setCollapsed }: Props ) => {
	const { Sider } = Layout;
	const location = useLocation();

	const menuItems = [
		{
			key: '/profile',
			icon: <UserOutlined />,
			label: <Link to={'/profile'}>Profile</Link>,
		},
		{
			key: '/dialogs',
			icon: <MessageOutlined />,
			label: <Link to={'/dialogs'}>Dialogs</Link>,
		},
		{
			key: '/users',
			icon: <UsergroupAddOutlined />,
			label: <Link to={'/users'}>Users</Link>,
		},
		{
			key: '/gallery',
			icon: <CameraOutlined />,
			label: <Link to={'/gallery'}>Gallery</Link>,
		},
		{
			key: '/chat',
			icon: <SmileOutlined />,
			label: <Link to={'/chat'}>Live Chat</Link>,
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
			trigger={null} collapsible collapsed={collapsed}
			breakpoint="lg"
			style={siderStyle}
			onBreakpoint={(broken) => setCollapsed(broken)}
			// onCollapse={(collapsed, type) => {console.log(collapsed, type)}}
		>
			<div className="demo-logo-vertical" />

			<StyledLogo collapsed={collapsed}>
				<img src={collapsed ? logo_1 : logo_2} alt="logo" />
			</StyledLogo>

			<StyledMenu
				theme="dark" mode="inline"
				selectedKeys={[location.pathname]}
				style={{ background: `${myTheme.colors.siderBackground}` }} 
				items={menuItems} 
			>
			</StyledMenu>
		</Sider>
	)
}


const StyledMenu = styled(Menu)`
  .ant-menu-item-selected {
    background: ${myTheme.colors.gradient};
  }
`;

const StyledLogo = styled.div<{ collapsed: boolean }>`
	text-align: center;
	margin: 10px 0 40px;
	img {
		width: ${ ({ collapsed }) => (collapsed ? '50px' : '150px') };
		height: 50px;
	}
`