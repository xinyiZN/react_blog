import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import MyNav from '../MyNav';
import Footer from '../Footer';

const BasicLayout: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header>
        <MyNav/>
      </header>
      <main style={{
        marginTop: '1em',
        width: '100%',
        margin: '1em auto 0',  // 修改margin，使其水平居中
        flex: '1 0 auto'  // 让main区域自动填充剩余空间
      }}>
        <Outlet />
      </main>
      <footer style={{
        marginTop: 'auto'  // 将footer推到底部
      }}>
        <Footer/>
      </footer>
    </div>
  );
};

export default BasicLayout;