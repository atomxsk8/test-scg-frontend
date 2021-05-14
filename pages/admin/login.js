import { useEffect, useState } from 'react';
import { Form, Input, Button, Layout, Spin, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import { Configs } from '../../configs';
const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem('token')  
        if(token && window) window.location.replace('/admin')
    },[])
    const onFinish = async (values) => {
        setLoading(true)
        await fetch(`${Configs.HOST}/v1/auth/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            })
            .then(response => response.json())
            .then(data => {
                if(data.code) {
                    notification.error({
                        message: 'Authentication',
                        description: data.message
                    })
                }else {
                    localStorage.setItem('token', data.tokens.access.token)  
                    router.replace('/admin')
                    // setTimeout(() => {
                    // }, 1000)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false)
            });
    };
    return (
        <Layout style={{ height: '100vh', justifyContent:'center', alignItems:'center' }}>
            <h1 style={{ fontSize:60, textAlign: 'center' }}>ADMIN</h1>
            <Spin spinning={loading}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Layout>
    )
}

export default Login