import React, { useEffect, useState } from "react"
import ArchivesTimeLine from "./components/ArchiveDetail"
import ChildrenLayout from "@/components/ChildrenLayout"
import { Article } from "@/types"
import { articlesApi } from "@/api/ArticleApi"

const Archives: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await articlesApi.getTotalArticle()
        setArticles(response.data.data.lists)
        // setLoading(true)
      } catch (error) {
        console.error("获取归档数据失败:", error)
      }
    }
    fetchArchives()
  }, [])

  return (
    <ChildrenLayout
      title="归档"
      backgroundImage={"/assets/img/background.jpeg"}
      children={<ArchivesTimeLine articles={articles} />}
    />
  )
}

export default Archives
