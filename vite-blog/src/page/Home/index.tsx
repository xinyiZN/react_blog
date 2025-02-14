import Articles from "../Articles"
import RightSide from '@/components/RightSide';
import "./index.scss"
interface SocialLink {
  platform: 'github' | 'twitter' | 'wechat';
  url: string;
}
function Home() {
  const socialLinks :SocialLink[]= [
    { platform: 'github', url: 'https://github.com/yourusername' },
    { platform: 'twitter', url: 'https://twitter.com/yourusername' },
    { platform: 'wechat', url: '#' }
  ];

  const tags = [
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: '前端开发', color: '#f50' },
    { name: 'JavaScript', color: '#f0db4f' }
  ];

  return (
    <div className="main-content">
        <Articles />
        <RightSide
          avatar="/avatar.jpg"
          name="XXINYI"
          bio="前端开发工程师 / React爱好者"
          socialLinks={socialLinks}
          tags={tags}
        />
    
    </div>
  )
}

export default Home
