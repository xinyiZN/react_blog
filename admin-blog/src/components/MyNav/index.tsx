import React, { useEffect, useState } from "react"
import { MenuItems } from "./config"
import { Menu } from "antd"
import type { MenuProps } from "antd"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/redux/hooks"
import { setCurrentMenu, setParentMenu } from "@/redux/slices/MenuSlice"

type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[] // 添加 children 属性
}

const MyNav: React.FC = () => {
  // 获取 dispatch 函数
  const dispatch = useAppDispatch()

  const [collapsed, setCollapsed] = useState(false)
  const [items, setItems] = useState<MenuItem[]>(MenuItems)
  const navigate = useNavigate()
  const [headBarCurrent, changeHeadBarCurrent] = useState("")
  const [clickChange, changeClickChange] = useState("")

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    // 在菜单点击事件发生时
    if (clickChange) {
      // 跳转页面
      navigate(clickChange)
    }
  }, [clickChange])

  const handleMenuClick = (e: any) => {
    // 当顶部导航栏触发点击的时候 需要更新两个值
    // 告知菜单选中值发生了变化
    changeHeadBarCurrent(e.key)
    //父级菜单
    const parentItem = items.find((item) =>
      item?.children?.some((child) => child.key === e.key)
    )
    const parentName = parentItem?.key || ""
    console.log("父级菜单名称:", parentName)
    const url = "/" + e.key
    console.log("当前菜单名称:", e.key)
    dispatch(setCurrentMenu(e.key))
    dispatch(setParentMenu(parentName))
    // 告知触发了菜单点击事件 需要跳转页面了
    changeClickChange(url)
  }
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      inlineCollapsed={collapsed}
      items={items}
      onClick={handleMenuClick}
    />
  )
}

export default MyNav
