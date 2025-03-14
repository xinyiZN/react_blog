import React, { useEffect, useState } from 'react';
import { Button, Flex, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { TagType ,
  Category,
  ArticleItem,} from "@/types/article"
import { useAppDispatch } from '@/redux/hooks';
import { fetchArticles } from '@/redux/slices/ArticleSlice';
import { Link } from 'react-router-dom';
import EditArticleModal from './components';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];



interface DataType {
  key: React.Key;
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






const ArticlePage: React.FC = () => {

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
    { title: '文章地址', dataIndex: 'url', render: (url: string) => <Link to={url}>{url}</Link> },
    { title: '状态', dataIndex: 'state' },
    {
      title: "操作", dataIndex: 'operation', render:(_, record) => (
        <Flex gap="small" wrap>
          <Button
            value="small"
            color="primary"
            variant="outlined"
            onClick={() => handleModalArticle(record,"edit")}
          >
            修改
          </Button>
          <Button
            value="small"
            color="danger"
            variant="outlined"
            onClick={() => handleModalArticle(record,"delete")}
          >
            删除
          </Button>
        </Flex>
      )
      
    }
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  //模态框属性值
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [currentArticle,setCurrentArticle]=useState<ArticleItem>()
  //本表格数据
  const [articlesData, setArticlesData] = useState<DataType[]>()
  
  const dispatch = useAppDispatch()



  //关闭模态操作
  const handleCloseModal = async () => {
    setIsModalOpen(false)
  }
  //模态框点击了提交操作就会重新获取新的数据刷新表格
  const handleDataUpdate = async () => {
    const data = await dispatch(fetchArticles());
    setArticlesData(data.payload.map((item: DataType) => ({
      ...item
    })));
  };
  //行按钮-修改-删除操作
  const handleModalArticle = (record: DataType,type:string) => {
    console.log("行数据：", record);
    // 打开模态框的逻辑
    if (type = "edit") {
      setIsModalOpen(true)
      setTitle("修改文章")
      setCurrentArticle(record)
    } else {
      console.log("删除文章")
    }
  }


  //初始化表格数据
  useEffect(() => {
    const getAllArticles = async () => {
      const data = await dispatch(fetchArticles())
      console.log("文章数据data.payload：", data.payload)
      setArticlesData(data.payload.map((item: DataType) => ({
        ...item,
        key: item.id, // 添加 key 属性
      })))
    }
    getAllArticles()
  },[dispatch])

  //表格顶部多选按钮
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
<>    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          一键删除
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={articlesData} />
    </Flex>
    <EditArticleModal
        isModalOpen={isModalOpen}
        title={title}
        article={currentArticle!}
        onCloseModal={handleCloseModal}
        onSuccess={handleDataUpdate}
    /></>
  );
};

export default ArticlePage;