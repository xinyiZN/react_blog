import React from 'react';
import  './index.scss';

interface ChildrenLayoutProps {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
}

const ChildrenLayout: React.FC<ChildrenLayoutProps> = ({ title, children, backgroundImage }) => {
  return (
    <div className="child-container">
      <div 
        className="childTitle"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
        }}
      >
        <div className="overlay"></div>
        <h1>{title}</h1>
      </div>
      <div className="childContent">
        {children}
      </div>
    </div>
  );
};

export default ChildrenLayout;
