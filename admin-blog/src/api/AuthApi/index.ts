import http from "@/utils/http"

interface authState {
  id: number
  name: string
  password?: string
  avatar?: string
  des?: string
}

const AuthApi = {
  getAllAuth: async () => {
    const res = http({
      method: "GET",
      url: "/tags"
    })
    return res
  },
}

export { AuthApi }
