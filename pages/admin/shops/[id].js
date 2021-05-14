import React, { useState } from 'react';
import { notification, Skeleton, Divider, Button, Table, Space, Modal, Popconfirm } from 'antd';
import { useRouter } from 'next/router'
import useSWR, { mutate, trigger } from 'swr';
import { pathOr } from 'ramda';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from '../../../components/admin/Title';
import AdminLayout from "../../../components/layout/AdminLayout"
import ShopForm from '../../../components/shop/ShopForm';
import fetcher, { del, patch, post } from '../../../utils/fetcher';
import AddProductForm from '../../../components/shop/AddProductForm';

const Shops = () => {
    const router = useRouter()
    if(!router.isReady) return null
    const { data, error } = useSWR(`/v1/shops/${router.query.id}`, fetcher)
    const [loading, setLoading] = useState(false)
    if(error) {
        router.back()
    }
    const onFinish = (values) => {
        setLoading(true)
        const url = `/v1/shops/${router.query.id}`
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
                    <ShopForm onFinish={onFinish} initialValues={data} submitName="Update" loading={loading}/>
                    <Divider/>
                    <ShopProducts shopId={router.query.id}/>
                </>
            }
        </AdminLayout>
    )
}

const ShopProducts = ({ shopId }) => {
    const [page, setPage] = useState(1);
    const [current, setCurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const form = React.createRef();
    const { data, error } = useSWR(`/v1/shop-products?shop=${shopId}&page=${page}`, fetcher)
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleOk = () => {
        form.current.submit()
    };
    const handleCancel = () => {
        setCurrent(null)
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        values = { shop: shopId, product: values.productId, qty: values.qty }
        const shopproductId = current?.id || ''
        const url = `/v1/shop-products/${shopproductId}`
        mutate(url, async() => {
            const resp = shopproductId ? await patch(url, values) : await post(url, values)
            trigger(`/v1/shop-products?shop=${shopId}&page=${page}`)
            if(!resp.code){
                notification.success({
                    message: !!shopproductId ? 'Update' : 'Create',
                    description: !!shopproductId ? 'Update Success' : 'Create Success'
                })
            }
            handleCancel()
        })
    }
    const removeProduct = (id) => {
        const url = `/v1/shop-products/${id}`
        mutate(url, async() => {
            const resp = await del(url)
            trigger(`/v1/shop-products?shop=${shopId}&page=${page}`)
            if(!resp.code){
                notification.success({
                    message: 'Delete',
                    description: 'Delete Success'
                })
            }
        })
    }
    const results = pathOr([], ['results'], data)
    const columns = [
        {
          title: 'Product',
          render: (text, record) => (
            <span>{record.product.name}</span>
          ),
        },
        {
          title: 'Qty',
          dataIndex: 'qty',
          align: 'center',
        },
        {
          title: 'Action',
          align: 'right',
          render: (text, record) => (
            <Space size="small">
                <Button type="primary" shape="round" icon={<EditOutlined />} size="middle" 
                    onClick={()=> {
                        setCurrent(record) 
                        showModal() 
                    }}/>
                <Popconfirm title="Do you want to delete it?" okText="Yes" cancelText="No" onConfirm={() => removeProduct(record.id)}>
                    <Button danger shape="round" icon={<DeleteOutlined />} size="middle" />
                </Popconfirm>
            </Space>
          ),
        },
    ];
    return (
        <>
            <Title title="Shop Product" button={<Button type="primary" onClick={showModal}>Add Product</Button>}/>
            <Table columns={columns} dataSource={results} size="middle" bordered rowKey="id" 
              loading={!Boolean(results)}
              pagination={{ 
                current: page, 
                total: data?.totalResults || 0, 
                showTotal: total => `Total ${total} items`, 
                onChange: (page) => setPage(page)
              }}
            />
            {isModalVisible && <Modal title="Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
                <AddProductForm formRef={form} onFinish={onFinish} current={current}/>
            </Modal>}
        </>
    )
}

export default Shops