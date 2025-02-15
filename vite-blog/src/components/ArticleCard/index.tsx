import React from 'react';
import { Card, Tag, Space } from 'antd';
import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  id: number;
  title: string;
  desc: string;
  date: string;
  category: string;
  tags: string[];
  filePath?:string,
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  desc,
  date,
  category,
  tags,
  filePath,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
      const parts = filePath?.split("/") as string[];
      const filepath = parts[parts.length - 1];
    navigate(`/article/${filepath}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ marginBottom: 10, cursor: 'pointer' }}
    >
      <h2 style={{ 
        fontSize: '1.8rem', 
        marginBottom: '0.5rem',
        fontWeight: 'bold'
      }}>{title}</h2>
      
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
