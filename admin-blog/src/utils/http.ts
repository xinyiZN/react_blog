//进一步封装请求
import axios from 'axios';

// 创建 axios 实例
const http = axios.create({
  // 从环境变量中获取 baseURL
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
});


export default http