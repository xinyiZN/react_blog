import React, { useState, useEffect } from "react"
import {
  GithubOutlined,
  TwitterOutlined,
  WechatOutlined,
  MailOutlined,
  QqOutlined
} from "@ant-design/icons"
import { Tag } from "antd"
import "./index.scss"
import type { RightSideProps } from "@/types"

const RightSide: React.FC<RightSideProps> = ({
  avatar,
  name,
  des,
  socialLinks,
  tags
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <GithubOutlined className="social-icon" />
      case "twitter":
        return <TwitterOutlined className="social-icon" />
      case "wechat":
        return <WechatOutlined className="social-icon" />
      case "email":
        return <MailOutlined className="social-icon" />
      case "qq":
        return <QqOutlined className="social-icon" />
      default:
        return null
    }
  }

  const handleTagClick = (tagId: number) => {
    // navigate(`/tags/${tagId}`);
    console.log("点击的tag为：", tagId)
  }

  return (
    <div className="right-side">
      {/* 个人信息区域 */}
      <div className="profile-section">
        <img src={avatar} alt="头像" className="avatar" />
        <h2 className="name">{name}</h2>
        <p className="bio">{des}</p>
        {/* 社交媒体链接 */}
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={
                link.platform === "wechat"
                  ? (e) => e.preventDefault()
                  : undefined
              }
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
        {/* 当前时间显示 */}
        <div className="time-section">
          <p className="current-time">
            {currentTime.toLocaleString("zh-CN", {
              hour12: false,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            })}
          </p>
        </div>
      </div>
      {/* 标签区域 */}
      <div className="tags-section">
        <h3>标签</h3>
        <div className="tags-container">
          {tags?.map((tag, index) => (
            <Tag
              key={index}
              color={tag.color}
              onClick={() => handleTagClick(tag.id)}
              style={{ cursor: "pointer" }}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSide
