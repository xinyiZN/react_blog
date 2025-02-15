import { articlesApi } from "@/api/ArticleApi"

export const fetchArticles = async () => {
  try {
    const res = await articlesApi.getTotalArticle()
    return res.data
  } catch (error) {
    console.log("获取文章数据失败：", error)
  }

}