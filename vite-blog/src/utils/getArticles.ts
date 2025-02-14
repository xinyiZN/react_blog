import { articlesApi } from "@/api/ArticleApi"

export const fetchArticles = async () => {
  try {
    const res = await articlesApi.getTotalArticle()
    console.log("查询文章：", res.data)
    return res.data
  } catch (error) {
    console.log("获取文章数据失败：", error)
  }

}