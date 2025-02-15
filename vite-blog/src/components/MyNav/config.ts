import { HomeFilled, BookFilled, SwitcherFilled, TagsFilled, MessageFilled, FireFilled } from '@ant-design/icons';
import { MenuItem } from '@/types';

const Menus: MenuItem[] = [
  { name: "首页", to: "/", icon: HomeFilled },
  {
    name: "文章",
    icon: BookFilled,
    children: [
      { name: "归档", to: "/archives", icon: SwitcherFilled },
      { name: "标签", to: "/tags", icon: TagsFilled }
    ]
  },
  { name: "留言", to: "/msg", icon: MessageFilled },
  { name: "友链", to: "/about", icon: FireFilled },
]

export default Menus
