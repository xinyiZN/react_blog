import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import CopyButton from "../CopyButton"
import { Terminal } from "lucide-react"
import remarkGfm from "remark-gfm"
import "./gitcss/github-markdown.css"
import "./gitcss/github-markdown-light.css"
import "./index.scss"

interface MarkdownProps {
  filePath: string
}

const Markdown: React.FC<MarkdownProps> = ({ filePath }) => {
  const [content, setContent] = useState("")

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          `/assets/md/${filePath.replace(/^\/+/, "")}`
        )
        const text = await response.text()
        setContent(text)
      } catch (error) {
        console.error("加载 Markdown 文件失败:", error)
        setContent("加载失败，请稍后重试")
      }
    }

    fetchMarkdown()
  }, [filePath])

  // const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  //   setContent(e.currentTarget.value)
  // }

  return (
    <div className="container">
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children }) => <pre style={{ padding: "0" }}>{children}</pre>,
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            if (match?.length) {
              const id = Math.random().toString(36).substr(2, 9)
              return (
                <div className="text-base leading-normal rounded-md border">
                  <div
                    className="flex h-8 items-center justify-between bg-zinc-100 px-4 dark:bg-zinc-900"
                    style={{ margin: "2px" }}
                  >
                    <div className="flex items-center pl-4">
                      <Terminal size={18} />
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {node?.data?.meta}
                      </p>
                    </div>
                    <div className="r-4">
                      {" "}
                      <CopyButton id={id} />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <div id={id} className="p-4 mt-4">
                      {children}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <code {...props} className="rounded bg-gray-100 px-1">
                  {children}
                </code>
              )
            }
          },
          img: ({ node, src }) => {
            console.log(src, node)
            const imgSrc = src?.startsWith("/") ? src : `/assets/md/${src}`
            console.log(imgSrc)
            return (
              <img
                src={imgSrc}
                className="max-w-full h-auto"
                alt={node?.data?.meta || "图片"}
              />
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
