import ChildrenLayout from "@/components/ChildrenLayout"
import Markdown from "@/components/Markdown"
import React from "react"
import { useLocation } from "react-router-dom"
import "./index.scss"
const ArticleDetail: React.FC = () => {
  const location = useLocation()
  const { filepath } = location.state || {}
  console.log("filepath", filepath)

  return (
    <ChildrenLayout
      title="文章详情"
      backgroundImage={"/assets/img/background.jpeg"}
      children={
        <div className="flex justify-center m-10">
          {filepath ? (
            <Markdown filePath={filepath} />
          ) : (
            <div className="article-detail">
              <p>未上传文章</p>
            </div>
          )}
        </div>
      }
    />
  )
}

export default ArticleDetail
