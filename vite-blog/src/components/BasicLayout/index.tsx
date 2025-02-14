import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import MyNav from '../MyNav';
import Footer from '../Footer';

const BasicLayout: React.FC = () => {
  return (
    <div>
     <header>
       <MyNav/>
      </header>
      <main style={{
        marginTop: '1em',
        width: '90%',
        margin: '1em auto'  // 使用auto实现水平居中
      }}>
          {/* Outlet 用于渲染子路由内容 */}
          <Outlet />
      </main>
      <footer>
       <Footer/>
      </footer>
    </div>
  );
};

export default BasicLayout;