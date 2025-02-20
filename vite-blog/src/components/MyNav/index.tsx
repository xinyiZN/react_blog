import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { UserOutlined, SmileFilled } from "@ant-design/icons"
import { Input, Dropdown } from "antd"
import Menus from "./config"
import "./index.scss"
import type { MenuProps } from "antd"
import type { MenuItem, ArticleApi } from "@/types"
import type { GetProps } from "antd"
import { articlesApi } from "@/api/ArticleApi"

type SearchProps = GetProps<typeof Input.Search>

const { Search } = Input

const MyNav: React.FC = () => {
  const [searchResults, setSearchResults] = useState<ArticleApi[]>([])
  const getDropdownItems = (children: MenuItem[]): MenuProps["items"] => {
    return children.map((child) => ({
      key: child.to ?? "",
      label: (
        <NavLink to={child.to ?? ""}>
          {child.icon && <child.icon />}
          <span>{child.name}</span>
        </NavLink>
      ),
      type: "item" as const
    }))
  }
  // 防抖函数，避免频繁请求
  const debounce = <T extends (...args: [string]) => void>(
    func: T,
    delay: number
  ): T => {
    let timer: NodeJS.Timeout | null = null
    return ((value: string) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func(value)
      }, delay)
    }) as T
  }

  const handleSearch = debounce(async (value: string) => {
    if (value) {
      try {
        // 发送请求到后端获取数据
        const response = await articlesApi.searchArticle(value)
        setSearchResults(response.data.data)
      } catch (error) {
        console.error("搜索出错:", error)
      }
    } else {
      setSearchResults([])
    }
  }, 300)

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    handleSearch(value)
    console.log(info?.source, value)
  }
  return (
    <>
      <nav className="nav">
        <div className="homeSvg">
          <NavLink to="/" style={{ color: "#333" }}>
            <SmileFilled className="icon" />
            XIN's 博客
          </NavLink>
        </div>
        <ul className="nav-menu">
          {Menus.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <Dropdown
                  menu={{ items: getDropdownItems(item.children) }}
                  placement="bottom"
                >
                  <span>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </span>
                </Dropdown>
              ) : (
                <NavLink to={item.to || ""}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="rightBar">
          <div className="searchBar">
            <Search
              placeholder="搜索文章..."
              allowClear
              onSearch={onSearch}
              style={{ width: 304 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div
                className="border bg-white shadow-lg p-4"
                style={{
                  zIndex: 10,
                  position: "absolute",
                  width: 304,
                  border: "1px solid #d9d9d9"
                }}
              >
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="py-2 hover:bg-gray-100"
                    style={{ padding: "3px 5px" }}
                  >
                    <NavLink
                      to={`/article/${result.id}`}
                      state={{
                        filepath:
                          result.url?.split("/")[
                            result.url?.split("/").length - 1
                          ]
                      }}
                    >
                      {result.title}
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="adminSvg">
            {/* 登录到后台-- */}
            <NavLink to="xxinzz.cloud/admin">
              <UserOutlined style={{ fontSize: "20px", color: "black" }} />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MyNav
