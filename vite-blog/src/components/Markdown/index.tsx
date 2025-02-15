import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  filePath: string;
}

const Markdown: React.FC<MarkdownProps> = ({ filePath }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/assets/md/${filePath.replace(/^\/+/, '')}`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('加载 Markdown 文件失败:', error);
        setContent('加载失败，请稍后重试');
      }
    };

    fetchMarkdown();
  }, [filePath]);

  return (
    <div className="markdown-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
