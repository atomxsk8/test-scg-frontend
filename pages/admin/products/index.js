import { Table, Space, Button } from 'antd';
import { pathOr } from 'ramda';
import useSWR from 'swr';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import Title from '../../../components/admin/Title';
import AdminLayout from "../../../components/layout/AdminLayout"
import fetcher from '../../../utils/fetcher';
import { useState } from 'react';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image Url',
      dataIndex: 'imageUrl',
    },
    {
      title: 'Action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Link href={`/admin/products/${record.id}`}>
            <Button type="primary" shape="round" icon={<EditOutlined />} size="middle" />
          </Link>
        </Space>
      ),
    },
];
const Products = () => {
    const [page, setPage] = useState(1);
    const { data, error } = useSWR(`/v1/products?page=${page}`, fetcher)
    const results = pathOr([], ['results'], data)
    return (
        <AdminLayout>
            <Title title="Product Management" buttonName="Create Product" buttonLink="/admin/products/create" />
            <Table columns={columns} dataSource={results} size="middle" bordered rowKey="id" 
              loading={!Boolean(results)}
              pagination={{ 
                current: page, 
                total: data?.totalResults || 0, 
                showTotal: total => `Total ${total} items`, 
                onChange: (page) => setPage(page)
              }}
            />
        </AdminLayout>
    )
}

export default Products