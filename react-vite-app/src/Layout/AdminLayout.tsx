import React from 'react';
import './AdminLayout.less';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
} from '@ant-design/icons';

import AdminRoutes from '@/router/AdminRoutes';
const { Header, Sider, Content } = Layout;
import useNavgiate2 from '@/Hooks/useNavgiate';
export default function () {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavgiate2();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider">
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/Home')}>
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<VideoCameraOutlined />}
                        onClick={() => navigate('/About')}
                    >
                        About
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={<UploadOutlined />}
                        onClick={() => navigate('/NotFound')}
                    >
                        Not Found
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background layout-header" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    <AdminRoutes />
                </Content>
            </Layout>
        </Layout>
    );
}
