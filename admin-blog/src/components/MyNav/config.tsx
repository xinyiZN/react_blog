import { MenuItem } from "@/types"
import {
  UserOutlined,
  HomeOutlined,
  LinkOutlined,
  FileMarkdownOutlined,
  TagOutlined,
  MenuOutlined,
  MessageOutlined
} from "@ant-design/icons"
const MenuItems: MenuItem[] = [
  {
    key: "base",
    label: "基础管理",
    icon: <HomeOutlined />,
    children: [
      { key: "user", label: "用户管理", icon: <UserOutlined /> },
      { key: "link", label: "友链管理", icon: <LinkOutlined /> },
      { key: "menu", label: "菜单管理", icon: <MenuOutlined /> }
    ]
  },
  { key: "article", label: "文章管理", icon: <FileMarkdownOutlined /> },
  { key: "tag", label: "标签管理", icon: <TagOutlined /> },
  { key: "message", label: "留言管理", icon: <MessageOutlined /> }
]

export { MenuItems }
