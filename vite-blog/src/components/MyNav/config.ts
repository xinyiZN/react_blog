interface MenuItem {
  name: string
  to: string
}

const Menus: MenuItem[] = [
  { name: "首页", to: "/" },
  { name: "文章", to: "/articles" },
  { name: "标签", to: "/tags" },
  // { name: "归档", to: "/archives" },
  { name: "留言", to: "/msg" },
  { name: "关于", to: "/about" }
]

export default Menus
