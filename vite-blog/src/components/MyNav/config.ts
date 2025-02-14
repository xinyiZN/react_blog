import { HomeFilled, BookFilled, SwitcherFilled, TagsFilled, MessageFilled, FireFilled } from '@ant-design/icons';
interface MenuItem {
  name: string
  to: string
  icon?: React.ComponentType
  children?: MenuItem[]
}

const Menus: MenuItem[] = [
  { name: "首页", to: "/", icon: HomeFilled },
  {
    name: "文章",
    to: "/articles",
    icon: BookFilled,
    children: [
      { name: "归档", to: "/articles/archives", icon: SwitcherFilled },
      { name: "标签", to: "/articles/tags", icon: TagsFilled }
    ]
  },
  { name: "留言", to: "/msg", icon: MessageFilled },
  { name: "友链", to: "/about", icon: FireFilled },
]

export default Menus
