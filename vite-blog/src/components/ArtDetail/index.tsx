import { useEffect, useState } from "react"
import { Article } from "@/types";
interface Props {
  id: string;
}

function ArtDetail({ id }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // 替换为实际的 API 调用
        const response = await fetch(`/api/articles/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (!article) return <div>文章不存在</div>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <div className="article-content">{article.content}</div>
    </div>
  );
}

export default ArtDetail
