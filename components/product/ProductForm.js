import { Form, Input, Button, Spin } from 'antd';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const ProductForm = ({ onFinish, submitName = 'Create', loading = false, ...props }) => {
    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} layout="vertical" {...props}>
                <Form.Item name="name" label="Product Name" rules={[{ 
                    required: true,
                    message: 'Please enter Product name!',
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="imageUrl" label="Product image url" rules={[{ 
                    required: true,
                    message: 'Please enter Product image url'
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

export default ProductForm