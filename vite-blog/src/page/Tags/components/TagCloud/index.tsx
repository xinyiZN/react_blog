import { TagCloud } from "react-tagcloud"
import { Tag as TagItem } from "@/types"
import "./index.scss"
interface TagCloudComponentProps {
  tags: TagItem[]
  onTagClick: (tagId: number, tagName: string, tagColor?: string) => void
}

function TagCloudComponent({ tags, onTagClick }: TagCloudComponentProps) {
  // 转换标签数据为词云格式
  const cloudTags = tags.map((tag) => ({
    value: tag.name,
    count: tag.article_count || 1,
    key: String(tag.id),
    color: tag.color
  }))

  return (
    <div className="tagCloud">
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={cloudTags}
        onClick={(tag) => onTagClick(Number(tag.key), tag.value, tag.color)}
        className="cursor-pointer"
      />
    </div>
  )
}

export default TagCloudComponent
