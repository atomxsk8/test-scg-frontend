import { List, Modal, message, Skeleton } from 'antd';
import useSWR, { mutate, trigger } from 'swr';
import Link from 'next/link'
import {useRouter} from 'next/router'
import Fade from "react-reveal/Fade";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import fetcher, { post } from '../../utils/fetcher';
import UserLayout from '../../components/layout/UserLayout';
import Card from '../../components/common/Card';

const { confirm } = Modal;

const Home = () => {
    const page = 1
    const router = useRouter()
    if(!router.isReady) return null
    const { data, error } = useSWR(`/v1/shop-products?shop=${router.query.id}&limit=1000`, fetcher)
    
    const onClickBuy = (id) => {
        confirm({
            title: 'Would you like to buy this product?',
            icon: <ExclamationCircleOutlined />,
            content: 'Would you like to buy this product?',
            onOk() {
                buy(id)
            }
        });
    }

    const buy = async (id) => {
        const url = `/v1/shop-products/buy/${id}`
        mutate(url, async() => {
            message.loading({ content: 'Loading...', key: 'buy' });
            const resp = await post(url, { qty : 1 })
            if(!resp.code){
                message.success({ content: 'Success!', key: 'buy', duration: 2 });
            }else {
                message.error({ content: `Can't buy`, key: 'buy', duration: 2 });
            }
            trigger(`/v1/shop-products?shop=${router.query.id}&limit=1000`)
        })
    }

    return (
        <UserLayout>
        <>
            <h1 style={{ fontSize:60, textAlign: 'center' }}>PRODUCT</h1>
            {!data && !error ? <Skeleton active/> : 
                <div>
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
                    dataSource={data?.results.filter(res => res.qty > 0) || []}
                    renderItem={(item, index) => (
                        <div onClick={()=> onClickBuy(item.id)}>
                            <Fade up delay={index * 50}>
                                <Card name={item.product.name} image={item.product.imageUrl} hoverText="Buy"/>
                            </Fade>
                        </div>
                    )}
                />
                </div>
            }
        </>
        </UserLayout>
    )
}
export default Home
