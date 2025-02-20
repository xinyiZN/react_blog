import http from "@/utils/axios"

const getUrl = (path: string) => `${path}`

export const articlesApi = {
  //获取所有的文章数据
  getTotalArticle: async () => {
    return http({
      method: "GET",
      url: getUrl("/articles")
    })
  },
  //根据id获取文章信息
  getArticleById: async (id: number) => {
    return http({
      method: "GET",
      url: getUrl(`/articles/${id}`)
    })
  },
  //模糊查询文章
  searchArticle: async (value: string) => {
    return http({
      method: "GET",
      url: getUrl("/articles/search"),
      params: { search: value }
    })
  }
}
