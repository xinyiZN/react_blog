import ChildrenLayout from "@/components/ChildrenLayout"
import Markdown from "@/components/Markdown"
import React from "react"
import { useParams } from "react-router-dom"

const ArticleDetail: React.FC = () => {
  const { filepath } = useParams<{ filepath: string }>()
  console.log("filepath", filepath)
  // 错误处理：当 filepath 不存在时，显示提示信息
  if (!filepath) {
    return (
      <div className="article-detail">
        <p>未找到文章路径信息，请检查链接。</p>
      </div>
    )
  }

  return (
    <ChildrenLayout
      title="文章详情"
      backgroundImage={"/assets/img/background.jpeg"}
      children={
        <div className="flex justify-center m-10">
          {/* 将 filepath 传递给 Markdown 组件 */}
          <Markdown filePath={filepath} />
        </div>
      }
    />
  )
}

export default ArticleDetail
