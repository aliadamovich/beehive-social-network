import { Layout, Menu } from 'antd';
import { UserOutlined, MessageOutlined, UsergroupAddOutlined, CameraOutlined, SmileOutlined } from '@ant-design/icons';
import logo_1 from '../../../assets/images/logo.png';
import logo_2 from '../../../assets/images/logo_login.svg';
import { Link } from 'react-router-dom';

export const SiderBlock = ({collapsed}: {collapsed: boolean}) => {
	const { Sider } = Layout;

	return (
		<Sider
			theme="dark"
			trigger={null} collapsible collapsed={collapsed}
			breakpoint="lg"
			// collapsedWidth="0"
			onBreakpoint={(broken) => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<div className="demo-logo-vertical" />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
				<div style={{textAlign:'center', margin: '10px 0 40px'}}>
					<img src={collapsed ? logo_1 : logo_2} alt="logo" style={{ width: collapsed ? "50px" : "150px", height: '50px' }} />
				</div>
				<Menu.Item key="1" icon={<UserOutlined />}><Link to={'/profile'}>Profile</Link></Menu.Item>
				<Menu.Item key="2" icon={<MessageOutlined />}><Link to={'/dialogs'}>Dialogs</Link></Menu.Item>
				<Menu.Item key="3" icon={<UsergroupAddOutlined />}><Link to={'/users'}>Users</Link></Menu.Item>
				<Menu.Item key="4" icon={<CameraOutlined />}><Link to={'/gallery'}>Gallery</Link></Menu.Item>
				<Menu.Item key="5" icon={<SmileOutlined />}><Link to={'/chat'}>Live Chat</Link></Menu.Item>
			</Menu>
		</Sider>
	)
}
