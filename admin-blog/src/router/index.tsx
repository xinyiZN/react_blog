import AdminLayout from "@/components/AdminLayout"
import ArticlePage from "@/pages/Article"
import TagPage from "@/pages/Tag"
import MsgPage from "@/pages/Msg"
import { createBrowserRouter } from "react-router-dom"
import UserPage from "@/pages/Base"
import MenuPage from "@/pages/Base/Menu"
import LinkPage from "@/pages/Base/Link"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/article",
        element: <ArticlePage />
      },
      {
        path: "/tag",
        element: <TagPage />
      },
      {
        path: "/message",
        element: <MsgPage />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/link",
        element: <LinkPage />
      },
      {
        path: "/menu",
        element: <MenuPage />
      }
    ]
  }
])
