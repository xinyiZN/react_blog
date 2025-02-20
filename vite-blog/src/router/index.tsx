import { createBrowserRouter } from "react-router-dom"
import Home from "@/page/Home"
import Archive from "@/page/Archives"
import Tags from "@/page/Tags"
import Msg from "@/page/Msg"
import About from "@/page/About"
import BasicLayout from "@/components/BasicLayout"
import ArticleDetail from "@/page/Articles/components/ArticleDetail"
import TagArchive from "@/page/Tags/components/TagArchives"
// 引入其他需要的页面组件

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "archives",
        element: <Archive />
      },
      {
        path: "tags",
        element: <Tags />
      },
      {
        path: "msg",
        element: <Msg />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "article/:id",
        element: <ArticleDetail />
      },
      {
        path: "tag/:id",
        element: <TagArchive />
      }
    ]
  }
])

export default router
