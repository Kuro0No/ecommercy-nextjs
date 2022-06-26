import React from 'react'
import { Space, Table, Tag ,Popconfirm} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { CartSlice } from '../redux/cartReducer';


const Cart = () => {
  const { cart } = useSelector(state => state.cart)
  const dispath = useDispatch()
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {

        return <a>{text}</a>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return <Space size="large">
          <a onClick={() => handleIncrease(record)}>+</a>
          <a onClick={() => handleDecrease(record)}>-</a>
          <a onClick={() => handleDelete(record)}>x</a>
        </Space>
      },
    },
  ];
  const handleIncrease = (item) => {
    dispath(CartSlice.actions.increase({
      product: item
    }))
  }
  const handleDecrease = (item) => {
    dispath(CartSlice.actions.decrease({
      product: item
    }))
   
  }
  const handleDelete = (item) => {
    dispath(CartSlice.actions.delete({
      product: item
    }))
  }  
  
  const data = cart.map(item => {
    
    return {
      key: item.product.uuid,
      name: item.product.name,
      price: item.product.price * item.quantities,
      quantity: item.quantities,
    }
    
  })

  return (
    <div>
      <Popconfirm placement="topLeft"  okText="Yes" cancelText="No" >ee</Popconfirm>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Cart