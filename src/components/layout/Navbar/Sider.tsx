import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import logo_1 from '../../../assets/images/logo.png';
import logo_2 from '../../../assets/images/logo_login.svg';
import { Link } from 'react-router-dom';
import { myTheme } from '../../../styles/Theme';
import styled from 'styled-components';


export const SiderBlock = ({collapsed}: {collapsed: boolean}) => {
	const { Sider } = Layout;

	const menuItems = [
		{
			key: '1',
			icon: <UserOutlined />,
			label: <Link to={'/profile'}>Profile</Link>,
		},
		{
			key: '2',
			icon: <MessageOutlined />,
			label: <Link to={'/dialogs'}>Dialogs</Link>,
		},
		{
			key: '3',
			icon: <UsergroupAddOutlined />,
			label: <Link to={'/users'}>Users</Link>,
		},
		{
			key: '4',
			icon: <CameraOutlined />,
			label: <Link to={'/gallery'}>Gallery</Link>,
		},
		{
			key: '5',
			icon: <SmileOutlined />,
			label: <Link to={'/chat'}>Live Chat</Link>,
		},
	];

	return (
		<Sider
			theme="dark"
			trigger={null} collapsible collapsed={collapsed}
			breakpoint="lg"
			style={{ background: `${myTheme.colors.siderBackground}`}}

			onBreakpoint={(broken) => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<div className="demo-logo-vertical" />

			<StyledLogo collapsed={collapsed}>
				<img src={collapsed ? logo_1 : logo_2} alt="logo" />
			</StyledLogo>
			<StyledMenu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
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