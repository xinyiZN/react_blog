import React from 'react';
import { Card, Tag, Space } from 'antd';
import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';

interface ArticleCardProps {
  title: string;
  desc: string;
  date: string;
  category: string;
  tags: string[];
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  desc,
  date,
  category,
  tags,
  onClick,
}) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ marginBottom: 16 }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      
      <Space style={{ marginBottom: '1rem' }}>
        <Space>
          <CalendarOutlined />
          {date}
        </Space>
        <Space>
          <FolderOutlined />
          {category}
        </Space>
      </Space>

      <div style={{ marginBottom: '1rem' }}>
        {tags.map((tag) => (
          <Tag key={tag} color="blue" style={{ marginRight: 8 }}>
            {tag}
          </Tag>
        ))}
      </div>

      <p style={{ color: '#666', marginBottom: 0 }}>{desc}</p>
    </Card>
  );
};

export default ArticleCard;
