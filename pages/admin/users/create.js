import { useState } from 'react';
import { mutate } from 'swr';
import { notification } from 'antd';
import { useRouter } from 'next/router'
import Title from '../../../components/admin/Title';
import AdminLayout from "../../../components/layout/AdminLayout"
import UserForm from '../../../components/user/UserForm';
import { post } from '../../../utils/fetcher';
const Users = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true)
        const url = '/v1/users'
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
            <Title title="Create User"/>
            <UserForm onFinish={onFinish} submitName="Create" loading={loading}/>
        </AdminLayout>
    )
}

export default Users