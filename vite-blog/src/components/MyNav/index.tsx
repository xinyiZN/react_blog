import React from "react"
import { NavLink } from "react-router-dom"
import { UserOutlined,SmileFilled  } from "@ant-design/icons"
import { Input, Dropdown} from "antd"
import Menus from "./config"
import "./index.scss"
import type { MenuItem} from "@/types"
const MyNav: React.FC = () => {
  const getDropdownItems = (children: MenuItem[]) => {
    return children.map(child => ({
      key: child.to,
      label: (
        <NavLink to={child.to}>
          {child.icon && <child.icon />}
          <span>{child.name}</span>
        </NavLink>
      )
    }))
  }

  return (
    <>
      <nav className="nav">
        <div className="homeSvg">
          <NavLink to="/" style={{ color: '#333' }}><SmileFilled style={{color:'#333'}} />XIN's 博客</NavLink>
        </div>
        <ul className="nav-menu">
          {Menus.map((item) => (
            <li key={item.to}>
              {item.children ? (
                <Dropdown
                  menu={{ items: getDropdownItems(item.children) }}
                  placement="bottom"
                >
                  <NavLink to={item.to}>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </NavLink>
                </Dropdown>
              ) : (
                <NavLink to={item.to}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="rightBar">
          <div className="searchBar">
          <Input.Search
            placeholder="搜索文章..."
            allowClear
            onSearch={(value) => console.log(value)}
          />
        </div>
        <div className="adminSvg">
          {/* 登录到后台-- */}
          <NavLink to="xxinzz.cloud/admin">
            <UserOutlined style={{ fontSize: '20px', color: 'black'}}/>
          </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MyNav
