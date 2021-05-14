import { Form, Input, Button, Spin } from 'antd';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const UserForm = ({ onFinish, submitName = 'Create', loading = false, ...props }) => {
    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} layout="vertical" {...props}>
                <Form.Item name="email" label="Email" rules={[{ 
                    required: true,
                    message: 'Please enter email',
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ 
                    required: true,
                    message: 'Please enter password'
                }]}>
                    <Input type="password"/>
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ 
                    required: true,
                    message: 'Please enter name'
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                    <Button type="primary" htmlType="submit">
                        {submitName}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default UserForm