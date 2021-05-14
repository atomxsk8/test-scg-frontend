import { useState } from 'react';
import { notification, Skeleton } from 'antd';
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import Title from '../../../components/admin/Title';
import AdminLayout from "../../../components/layout/AdminLayout"
import ProductForm from '../../../components/product/ProductForm';
import fetcher, { patch } from '../../../utils/fetcher';

const Products = () => {
    const router = useRouter()
    if(!router.isReady) return null
    const { data, error } = useSWR(`/v1/products/${router.query.id}`, fetcher)
    const [loading, setLoading] = useState(false)
    if(error) {
        router.back()
    }
    const onFinish = (values) => {
        setLoading(true)
        const url = `/v1/products/${router.query.id}`
        mutate(url, async() => {
            const resp = await patch(url, values)
            setLoading(false)
            if(!resp.code){
                notification.success({
                    message: 'Update',
                    description: 'Update Success'
                })
                router.back()
            }

        })
    };
    return (
        <AdminLayout>
            {!data ? 
                <Skeleton active/> : 
                <>
                    <Title title={`Edit ${data.name}`}/>
                    <ProductForm onFinish={onFinish} initialValues={data} submitName="Update" loading={loading}/>
                </>
            }
        </AdminLayout>
    )
}

export default Products