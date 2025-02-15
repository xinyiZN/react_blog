import http from "@/utils/axios";
import { Tag } from "@/types";

const getUrl = (path: string) => `${path}`

export const tagApi = {
  // 获取所有标签
  getTags: async (): Promise<Tag[]> => {
    const { data } = await http({
      method: "GET",
      url: getUrl("/tags")
    })

    // 只保留需要的属性
    const simplifiedTags = data.data.lists.map(({ id, name, color, article_count }: any) => ({
      id,
      name,
      color,
      article_count
    }))
    return simplifiedTags
  },
}