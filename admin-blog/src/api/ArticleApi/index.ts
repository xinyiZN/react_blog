import http from "@/utils/http"
import qs from "qs";
import type {
  TagType,
  Category,
  ListItem,
  ResponseData,
} from "@/types/article"

const ArticleApi = {
  getAllArticle: async () => {
    const res = http({
      method: "GET",
      url: "/articles"
    })
    return res
  },
  // updateArticle: async (article) => {
  //   const res = http({
  //     method: "PUT",
  //     url: `/articles`,
  //     data: qs.stringify(article),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  //   return res
  // },
  // addArticle: async (article) => {
  //   const res = await http({
  //     method: "POST",
  //     url: "/articles",
  //     data: qs.stringify(article),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  //   return res
  // },
  // deleteArticle: async (id: number) => {
  //   const res = await http({
  //     method: "DELETE",
  //     url: `/articles/${id}`
  //   })
  //   return res
  // }
}

export { ArticleApi }
