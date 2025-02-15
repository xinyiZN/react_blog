import { useEffect, useState } from "react"
import { tagApi } from "@/api/TagsApi"
import { Tag as TagItem } from "@/types"
import { useNavigate } from "react-router-dom"
import TagCloudComponent from './components/TagCloud';
import "./index.scss"
import ChildrenLayout from "@/components/ChildrenLayout";

function Tags() {
  const [tags, setTags] = useState<TagItem[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true)
      try {
        const data = await tagApi.getTags()
        console.log("获取标签:", data)
        setTags(data)
      } catch (error) {
        console.error("获取标签失败:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])
  // 处理标签点击

  const handleTagClick = (tagId: number) => {
    navigate(`/articles?tag=${tagId}`)
  }
  return (
    <ChildrenLayout
      title="标签"
      backgroundImage={"/assets/img/background.jpeg"}
      children={<TagCloudComponent
                 tags={tags}
                 onTagClick={handleTagClick}
          />}
    />
  )
}

export default Tags
