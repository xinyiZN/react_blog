import React, { useEffect, useState } from 'react';
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined ,
} from '@ant-design/icons';

import { MenuItems } from './config';
import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];


const MyNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState<MenuItem[]>(MenuItems);
  const navigate = useNavigate()
  const [headBarCurrent, changeHeadBarCurrent] = useState("")
  const [clickChange, changeClickChange] = useState("")

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => { // 在菜单点击事件发生时
        if (clickChange) { // 跳转页面
            navigate(clickChange)
        }
    }, [clickChange])
     
  const handleMenuClick = (e: any) => {
  // 当顶部导航栏触发点击的时候 需要更新两个值
  // 告知菜单选中值发生了变化
  changeHeadBarCurrent(e.key) 
  const url = '/' + e.key
  console.log("url", url)
  // 告知触发了菜单点击事件 需要跳转页面了
  changeClickChange(url) 
}
  return (
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />

  );
};

export default MyNav;