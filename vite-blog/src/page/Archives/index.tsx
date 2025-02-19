import React, { useEffect, useState } from "react"
import ArchivesTimeLine from "./components/ArchiveDetail"
import ChildrenLayout from "@/components/ChildrenLayout"
import { Article } from "@/types"
import { articlesApi } from "@/api/ArticleApi"

const Archives: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await articlesApi.getTotalArticle()

        setArticles(response.data.data.lists)
      } catch (error) {
        console.error("获取归档数据失败:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArchives()
  }, [])

  const handleArticleClick = (articleId: number) => {
    console.log("点击的文章ID：", articleId)
  }

  return loading ? (
    <ChildrenLayout
      title="归档"
      backgroundImage={"/assets/img/background.jpeg"}
      children={
        <ArchivesTimeLine
          articles={articles}
          onArticleClick={handleArticleClick}
        />
      }
    />
  ) : (
    <div>没有数据</div>
  )
}

export default Archives
