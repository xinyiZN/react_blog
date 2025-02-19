import { useState, useEffect } from "react"
import Articles from "@/page/Articles"
import RightSide from "@/components/RightSide"
import "./index.scss"
import { AuthInfo, Tag } from "@/types"
import { authApi } from "@/api/AuthApi"
import { tagApi } from "@/api/TagsApi"

function Home() {
  const [auth, setAuth] = useState<AuthInfo>()
  const [tags, setTags] = useState<Tag[]>()
  useEffect(() => {
    const getAuthInfo = async () => {
      const data = await authApi.getAuthInfo()
      if (data) {
        setAuth(data)
      } else {
        console.log("获取用户数据失败")
      }
    }
    const getTags = async () => {
      const data = await tagApi.getTags()
      if (data) {
        setTags(data)
      } else {
        console.log("标签获取失败")
      }
    }
    getAuthInfo()
    getTags()
  }, [])

  return (
    <div className="main-content">
      <div className="articles-container">
        <Articles />
      </div>
      {auth && (
        <RightSide
          avatar={auth.avatar}
          name={auth.name}
          des="前端开发工程师 / React爱好者"
          socialLinks={auth.socials}
          tags={tags}
        />
      )}
    </div>
  )
}

export default Home
