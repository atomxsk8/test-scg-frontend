import { List, Skeleton } from 'antd';
import useSWR from 'swr';
import Link from 'next/link'
import Fade from "react-reveal/Fade";
import { EyeOutlined } from '@ant-design/icons';
import fetcher from '../utils/fetcher';
import UserLayout from '../components/layout/UserLayout';
import Card from '../components/common/Card';

const Home = () => {
  const page = 1
  const { data, error } = useSWR(`/v1/shops?limit=1000`, fetcher)
  return (
    <UserLayout>
      <>
        <h1 style={{ fontSize:60, textAlign: 'center' }}>Drinking Vending Machine</h1>
        {!data && !error ? <Skeleton active/> : 
          <div >
            <List
              grid={{ 
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
                xxl: 5, 
              }}
              dataSource={data?.results || []}
              renderItem={(item,index) => (
                <Fade up delay={index * 50}>
                  <Link href={`/shop/${item.id}`}>
                    <a><Card name={item.name} image={item.imageUrl} hoverIcon={<EyeOutlined/>}/></a>
                  </Link>
                </Fade>
              )}
            />
          </div>
        }
      </>
    </UserLayout>
  )
}
export default Home
