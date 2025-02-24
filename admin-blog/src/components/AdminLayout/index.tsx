import React, { useEffect, useState } from 'react';

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MyNav from '../MyNav';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const AdminLayout: React.FC = () => {
  const  menus  = useAppSelector((state) => state.menus)
  
  // useEffect(() => {
  //   // 当 currentMenu 更新时执行某些操作
  //   console.log("当前-layout-菜单:", menu);
  // }, [menu]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //监听面包屑导航
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
          <h1 className="text-white p-4 text-center">后台管理</h1>
          </div>
        <MyNav />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {menus.parentMenu ?<Breadcrumb.Item>{ menus.parentMenu}</Breadcrumb.Item>:"/"}
            <Breadcrumb.Item>{menus.currentMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;