import { Form, InputNumber, AutoComplete, Spin, Select } from 'antd';
import fetcher from '../../utils/fetcher';
import useSWR from 'swr';

const { Option } = Select;

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const AddProductForm = ({ onFinish, submitName = 'Create', loading = false, formRef = null, current, ...props }) => {
    if(current) current.productId = current.product.id
    const initialValues = {...current}
    const { data, error } = useSWR(`/v1/products?limit=100000`, fetcher)
    return (
        <Spin spinning={loading}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} layout="vertical" {...props} ref={formRef} initialValues={initialValues}>
                <Form.Item name="productId" label="Product" rules={[{ 
                    required: true,
                    message: 'Please select Product',
                }]}>
                    <Select
                        showSearch
                        placeholder="Select a product"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                            (data && data.results ? data.results : []).map(r => <Option value={r.id} key={r.id}>{r.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="qty" label="Qty" rules={[{ 
                    required: true,
                    message: 'Please enter Product qty'
                }]}>
                    <InputNumber min={0} style={{ width: '100%' }}/>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default AddProductForm