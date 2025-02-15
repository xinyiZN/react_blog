import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path" //导入Path模块
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // 配置 @ 别名指向 src 文件夹
    }
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/assets': {  // 添加静态资源的代理配置
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    },

  }
})
