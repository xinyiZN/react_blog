import React, { useState, useEffect } from "react"
import { Card, Pagination, Row, Col } from "antd"
import ArticleCard from "@/components/ArticleCard"
import MyPagination from "@/components/MyPagination";
import { fetchArticles } from "@/utils/getArticles"

interface ArticleApi {
  id: string;
  title: string;
  created_on: number;
  desc: string;
  date: string;
  category: {
    name: string;
  };
  tags:{
    name: string;
  }[];
}
interface Article {
  id: string;
  title: string;
  created_on: number;
  desc: string;
  date: string;
  category:  string;
  tags:string[];
}
function Articles() {
  // 文章列表数据状态
  const [articles, setArticles] = useState<Article[]>([])
  //获取所有文章
  // 分页参数
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  })

  // 获取文章数据
  useEffect(() => {
    const initArticles = async () => {
      const data = await fetchArticles()
      if (data) {
        const formattedArticles = data.data.lists.map((item:ArticleApi ) => ({
          id: item.id.toString(),
          title: item.title,
          desc: item.desc,
          date: new Date(item.created_on * 1000).toLocaleDateString(),
          category: item.category.name,
          tags: item.tags.map(tag => tag.name) // 直接映射tag名称数组
        }));
        setArticles(formattedArticles)
        setPagination(prev => ({
          ...prev,
          total: data.data.total || 0
        }))
      }
    }
    initArticles()
  }, [])

  // 处理页码变化
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    })
    // TODO: 这里需要调用获取文章列表的接口
  }

  return (
    <div className="articles-container">
      <Row gutter={[16, 16]}>
        {articles.map((article: Article, index) => (
          <Col xs={24} key={article.id}>
            <ArticleCard
              title={article.title}
              desc={article.desc}
              date={article.date}
              category={article.category}
              tags={article.tags}
              onClick={() => {
                console.log('Article clicked:', article.id);
              }}
              key={index}
            />
          </Col>
        ))}
      </Row>
      
      <div className="pagination-wrapper" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <MyPagination
          total={pagination.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Articles
