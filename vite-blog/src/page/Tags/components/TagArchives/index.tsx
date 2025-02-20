import { useEffect, useState } from "react"
import { Article } from "@/types"
import { tagApi } from "@/api/TagsApi"
import { useLocation, useParams } from "react-router-dom"
import ChildrenLayout from "@/components/ChildrenLayout"
import ArchiveTimeLine from "@/components/ArchiveTimeLine"

function TagArchive() {
  const location = useLocation()
  const { id } = useParams()
  const { name } = location.state || {}
  const [length, setLength] = useState()
  const [articles, setArticles] = useState<Article[]>()
  useEffect(() => {
    const getArticlesByTagId = async () => {
      try {
        const data = await tagApi.getArticleByTagId(Number(id))
        console.log("data:", data)
        setArticles(data.data)
        setLength(data.data.length)
      } catch (error) {
        console.log("error:", error)
      }
    }
    getArticlesByTagId()
  }, [id])
  return (
    <ChildrenLayout
      title="标签归档"
      backgroundImage={"/assets/img/background.jpeg"}
      name={name}
      children={
        length ? (
          <ArchiveTimeLine articles={articles} />
        ) : (
          <div className="article-detail">
            <p>该标签下没有文章</p>
          </div>
        )
      }
    />
  )
}

export default TagArchive
