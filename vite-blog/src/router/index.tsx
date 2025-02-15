import { createBrowserRouter } from 'react-router-dom';
import Home from "@/page/Home";
import Articles from '@/page/Archives';
import Tags from '@/page/Tags';
import Msg from '@/page/Msg';
import About from '@/page/About';
import BasicLayout from '@/components/BasicLayout';
import Archive from '@/page/Archives';
// 引入其他需要的页面组件

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "archives",
        element: <Articles/>,
      },
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "msg",
        element: <Msg />,
      },
      {
        path: "about",
        element: <About />,
      },
      // 其他路由配置
    ],
  },
]);

export default router;