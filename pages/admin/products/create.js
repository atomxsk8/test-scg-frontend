import { useState } from 'react';
import { mutate } from 'swr';
import { notification } from 'antd';
import { useRouter } from 'next/router'
import Title from '../../../components/admin/Title';
import AdminLayout from "../../../components/layout/AdminLayout"
import ProductForm from '../../../components/product/ProductForm';
import { post } from '../../../utils/fetcher';
const Products = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true)
        const url = '/v1/products'
        mutate(url, async() => {
            const resp = await post(url, values)
            setLoading(false)
            if(!resp.code){
                notification.success({
                    message: 'Success',
                    description: 'Create Success'
                })
                router.back()
            }

        })
    };
    return (
        <AdminLayout>
            <Title title="Create Product"/>
            <ProductForm onFinish={onFinish} submitName="Create" loading={loading}/>
        </AdminLayout>
    )
}

export default Products