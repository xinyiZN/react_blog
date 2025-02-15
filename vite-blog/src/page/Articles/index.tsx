import { useState, useEffect } from "react"
import {Row, Col } from "antd"
import ArticleCard from "@/components/ArticleCard"
import MyPagination from "@/components/MyPagination";
import { fetchArticles } from "@/utils/getArticles"
import { Article,ArticleApi} from "@/types";

function Articles() {
  // 文章列表数据状态
  const [articles, setArticles] = useState<Article[]>([])

  // 分页参数设置
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
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
          tags: item.tags.map(tag => tag.name),
          url:item.url,
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

  // 获取当前页的文章
  const getCurrentPageArticles = () => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return articles.slice(startIndex, endIndex);
  }

  // 更新处理页码变化的函数
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    })
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {getCurrentPageArticles().map((article: Article) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} key={article.id}>
            <ArticleCard
              id={article.id}
              title={article.title}
              desc={article.desc}
              date={article.date}
              category={article.category}
              tags={article.tags}
              filePath={article.url}
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
