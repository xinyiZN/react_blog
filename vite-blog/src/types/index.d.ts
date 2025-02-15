//社交媒体信息接口
interface SocialLink {
  id: string;
  platform: string;
  url: string;
}
//个人用户信息
interface AuthInfo {
  id: string,
  name: string,
  des: string
  avatar: string,
  socials: SocialLink[]
}
// 评论用户信息接口
interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email?: string;
}



// 标签接口
interface Tag {
  id: number;
  name: string;
  color: string;
  article_count?: number
}

//导航接口
interface MenuItem {  // 添加 export 关键字
  name: string
  to?: string
  icon?: React.ComponentType
  children?: MenuItem[]
}

// 文章接口
interface Article {
  id: number;
  title: string;
  created_on: number;
  desc: string;
  date: string;
  category: string;
  url?: string,
  tags: string[];
}

interface ArticleApi {
  id: number;
  title: string;
  created_on: number;
  desc: string;
  date: string;
  category: {
    name: string;
  };
  tags: {
    name: string;
  }[];
  url?: string;
}

// 评论接口
interface Comment {
  id: number;
  content: string;
  author: UserInfo;
  createTime: string;
  replyTo?: string;
  likes: number;
}

// 分页接口
interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

// 响应数据接口
interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

// 列表响应数据接口
interface ListResponse<T> {
  list: T[];
  pagination: Pagination;
}

// 主题配置接口
interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

//主页右侧接口
interface RightSideProps {
  avatar: string;
  name: string;
  des: string;
  socialLinks: SocialLink[];
  tags: Tag[] | undefined;
}

// 声明全局类型
declare global {
  // 扩展 Window 接口
  interface Window {
    __THEME_CONFIG__: ThemeConfig;
  }

  // 声明模块
  declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }

  declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module '*.jpg' {
    const value: string;
    export default value;
  }

  declare module '*.jpeg' {
    const value: string;
    export default value;
  }

  declare module '*.gif' {
    const value: string;
    export default value;
  }

  declare module '*.webp' {
    const value: string;
    export default value;
  }
}

export type {
  UserInfo,
  SocialLink,
  Tag,
  Article,
  ArticleApi,
  Comment,
  RightSideProps,
  Pagination,
  ResponseData,
  ListResponse,
  ThemeConfig,
  MenuItem,
  AuthInfo,
  SocialLink,
};
