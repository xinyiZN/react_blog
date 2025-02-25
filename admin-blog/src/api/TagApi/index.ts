import http from "@/utils/http"

const TagApi = {
  getAllTags: async () => {
    const res = http({
      method: "GET",
      url: "/tags"
    })
    return res
  },
  updateTag: async (id: number) => {
    const res = http({
      method: "PUT",
      url: `/tags/${id}`
    })
    return res
  },
  addTag: async ({ name, state, createdBy }: { name: string; state: number; createdBy: string; }) => {
    const res = await http({
      method: "POST",
      url: "/tags",
      data: { name, state, createdBy }
    })
    return res
  },
  deleteTag: async (id: number) => {
    const res = await http({
      method: "DELETE",
      url: `/tags/${id}`,
    })
    return res
  }
}

export { TagApi }