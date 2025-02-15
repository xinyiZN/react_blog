import http from "@/utils/axios";
import { AuthInfo } from "@/types";
const getUrl = (path: string) => `${path}`

export const authApi = {
  // 获取用户信息
  getAuthInfo: async (): Promise<AuthInfo> => {
    const { data } = await http({
      method: "GET",
      url: getUrl("/auth")
    })
    return data.data
  }
}