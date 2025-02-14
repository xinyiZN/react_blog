import React from "react"
import { NavLink } from "react-router-dom"
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { Input } from "antd"
import Menus from "./config"
import "./index.scss"
const MyNav: React.FC = () => {
  return (
    <>
      <nav className="nav">
        <div className="homeSvg">
          <NavLink to="/home">
            <HomeOutlined style={{ fontSize: '24px', color: 'black' }}/>
          </NavLink>
        </div>
        <ul>
          {Menus.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} >
                {item.name}
              </NavLink>
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
            <UserOutlined style={{ fontSize: '24px', color: 'black' }}/>
          </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MyNav
