import http from "@/utils/axios";

const getUrl = (path: string) => `${path}`

export const articlesApi = {
  //获取所有的文章数据
  getTotalArticle: async () => {
    const url = getUrl("/articles")

    return http({
      method: "GET",
      url: getUrl("/articles")
    })

  }

}