// 标签类型
interface TagType {
  id: number;
  created_on: number;
  modified_on: number;
  name: string;
  created_by: string;
  modified_by: string;
  state: number;
  color: string;
  article_count: number;
}

// 分类类型
interface Category {
  id: number;
  created_on: number;
  modified_on: number;
  name: string;
  created_by: string;
  modified_by: string;
  state: number;
}

// 列表项类型
interface ListItem {
  id: number;
  created_on: number;
  modified_on: number;
  tag_ids: string;
  tags: TagType[];
  category_id: number;
  category: Category;
  title: string;
  desc: string;
  content: string;
  created_by: string;
  modified_by: string;
  state: number;
  url: string;
}

// 数据类型
interface ResponseData {
  lists: ListItem[];
  total: number;
}



export type {
  TagType,
  Category,
  ListItem,
  ResponseData,
}