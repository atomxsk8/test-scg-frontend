import { Layout } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
const { Header, Content, Footer } = Layout;

const Home = ({children}) => {
  return (
    <Layout className="layout" style={{minHeight: '100vh'}}>
      <Header className="shadow-box" style={{ backgroundColor: 'white', overflow: 'overlay', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/">
          <a>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </Link>
        <Link href="/admin">
          <a>Admin Login</a>
        </Link>
      </Header>
      <Content style={{ padding: '30px 50px', backgroundColor: 'white' }}>
        {children}
      </Content>
    </Layout>
  )
}
export default Home
