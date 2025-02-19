import React, { useMemo } from 'react';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './index.scss';

import { Article } from '@/types';

interface ArchiveDetailComponentProps {
  articles: Article[];
  onArticleClick: (articleId: number) => void;
}

function ArchivesTimeLine({ articles, onArticleClick }: ArchiveDetailComponentProps) {
  // 按年份和月份对文章进行分组
  const groupedArticles = useMemo(() => {
    const groups: Record<string, Record<string, Article[]>> = {};
    articles.forEach(article => {
      const date = new Date(article.created_on * 1000);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][month]) {
        groups[year][month] = [];
      }
      // 将文章添加到对应年月的数组中
      groups[year][month].push(article);
      // 按照创建时间降序排序
      groups[year][month].sort((a, b) => b.created_on - a.created_on);
    });
    return groups;
  }, [articles]);

  return (
    <div className="archive-container">
      <div className="archive-total">共计 {articles.length} 篇文章</div>
      <div className="archive-section">
        {Object.entries(groupedArticles)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, months]) => (
          <div key={year} className="archive-year-section">
            <h2 className="year-title">{year}</h2>
            {Object.entries(months)
              .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA))
              .map(([month, articles]) => (
                articles.map(article => (
                  <div
                    key={article.id}
                    className="archive-item"
                    onClick={() => onArticleClick(article.id)}
                  >
                    <span className="article-date">
                      {month}-{new Date(article.created_on * 1000).getDate().toString().padStart(2, '0')}
                    </span>
                    <span className="article-title">{article.title}</span>
                  </div>
                ))
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchivesTimeLine;
