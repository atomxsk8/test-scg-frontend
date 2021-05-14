import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar } from 'antd';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import Link from 'next/link'
import fetcher from '../../utils/fetcher'
import {
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item danger onClick={() => {
            localStorage.removeItem('token')
            window.location.replace('/admin/login')
        }}>
          Logout
        </Menu.Item>
    </Menu>
  );


const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    const router = useRouter()
    if(!router.isReady) return null
    const { data, error } = useSWR(`/v1/users/getMe`, fetcher)
    if(!data) return null
    const path = router.pathname.split('/')
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} breakpoint="lg" 
            onCollapse={collapsed => setCollapsed(collapsed)}
            onBreakpoint={broken => setCollapsed(broken)}
        >
                <div className="logo" />
                <Menu theme="dark" mode="inline" 
                    defaultSelectedKeys={[router.pathname.split('/')[2] || "index"]}>
                        <Menu.Item key="index" icon={<SmileOutlined />}>
                            <Link href="/admin">
                                Admin
                            </Link>
                        </Menu.Item>
                            <Menu.Item key="users" icon={<UserOutlined />}>
                                <Link href="/admin/users">
                                    User Management
                                </Link>
                            </Menu.Item>
                        <Menu.Item key="shops" icon={<ShopOutlined />}>
                            <Link href="/admin/shops">
                            DVM Management
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="products" icon={<ShoppingCartOutlined />}>
                            <Link href="/admin/products">
                            Product Management
                            </Link>
                        </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, display:'flex', justifyContent:'flex-end' }}>
                    <Profile data={data}/>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    <Breadcrumb style={{ marginBottom:30 }}>
                        {
                            path.filter(p => !!p).map(p => <Breadcrumb.Item key={p}>{BreadcrumbName[p] || p}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const BreadcrumbName = {
    admin: 'Admin',
    users: 'Users',
    products: 'Products',
    shops: 'DVM',
    create: 'Create',
    "[id]": "Edit"
}

const Profile = ({data}) => {
    return (
        <Dropdown overlay={menu}>
            <span style={{ marginRight: 20 }}>
                <Avatar size={40} icon={<UserOutlined />} />
                <span style={{ marginLeft: 10 }}>{`${data.name} (${data.email})`}</span>
            </span>
        </Dropdown>
    )
}


export default AdminLayout