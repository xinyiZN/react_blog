import React, { useEffect, useState } from 'react';
import { Button, Flex, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { TagType ,
  Category,
  ListItem,} from "@/types/article"
import { useAppDispatch } from '@/redux/hooks';
import { fetchArticles } from '@/redux/slices/ArticleSlice';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];



interface DataType {
  id: number;
  created_on: number;
  modified_on: number;
  tag_ids: string;
  tags: TagType [];
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

const columns: TableColumnsType<DataType> = [
  { title: '标题', dataIndex: 'title' },
  {
    title: '创建时间', dataIndex: 'created_on', render: (created_on) => {
      const date = new Date(created_on);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      return <p>{formattedDate}</p>;
  }},
  { title: '创建人', dataIndex: 'created_by' },
  { title: '概述', dataIndex: 'desc' },
  {
    title: '标签', dataIndex: 'tags', render: (tags:TagType[] ) =>
     tags.map(tag => (
        <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>
      ))   
  },
  { title: '类别', dataIndex: 'category', render: (category: Category) => category.name },
  { title: '文章地址', dataIndex: 'url' },
  { title: '状态', dataIndex: 'state' },
];


const ArticlePage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [articlesData, setArticlesData] = useState<DataType[]>()
  const dispath=useAppDispatch()
  //获取数据
  useEffect(() => {
    const getAllArticles = async () => {
      const data = await dispath(fetchArticles())
      console.log("文章数据：", data.payload)
      setArticlesData(data.payload.map((item:DataType) => ({
        key: item.id, // 添加 key 属性
        ...item
      })))
    }
    getAllArticles()
  },[dispath])

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={articlesData} />
    </Flex>
  );
};

export default ArticlePage;