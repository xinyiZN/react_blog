import http from "@/utils/http"
import qs from "qs";

interface tagState {
  id: number
  name: string
  color: string
  state?: number
  created_by: string
}

const TagApi = {
  getAllTags: async () => {
    const res = http({
      method: "GET",
      url: "/tags"
    })
    return res
  },
  updateTag: async (tags: tagState) => {
    const { id, ...rest } = tags;
    const res = http({
      method: "PUT",
      url: `/tags/${id}`,
      params: { ...rest }
    })
    return res
  },
  addTag: async (tags: tagState) => {
    const res = await http({
      method: "POST",
      url: "/tags",
      data: qs.stringify(tags),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return res
  },
  deleteTag: async (id: number) => {
    const res = await http({
      method: "DELETE",
      url: `/tags/${id}`
    })
    return res
  }
}

export { TagApi }
