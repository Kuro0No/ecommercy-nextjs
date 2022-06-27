import React, { useState } from 'react'
import { Space, Table, Tag, Popconfirm, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { CartSlice } from '../redux/cartReducer';
import css from '../styles/cart.module.scss'

const { Text } = Typography


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};




const Cart = () => {
  const { cart } = useSelector(state => state.cart)
  const dispath = useDispatch()
  const sharedOnCell = (_, index) => {

    if (cart.length === index) {
      return {
        colSpan: 0,
      };
    }
  }

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      image: 'image',
      render: (_, record) => {
        return <a className={css.showproduct}>
          <img className={css.image}  src={record.image} alt="cart" />
          <p>{record.name}</p>
         
        </a>
      },
      onCell: sharedOnCell,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      onCell: sharedOnCell,

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      onCell: sharedOnCell,

    },
    {
      title: 'Action',
      key: 'action',
      onCell: sharedOnCell,

      render: (_, record) => {

        return <Space size="large">

          <a onClick={() => handleIncrease(record)}>+</a>
          {record.quantity > 1 && <a onClick={() => handleDecrease(record)}>-</a>}
          {record.quantity == 1 &&
            <Popconfirm title='Do you want to delete this product?' onConfirm={() => handleDelete(record)} placement="topLeft" okText="Yes" cancelText="No" >
              <a>-</a>
            </Popconfirm>}
          <Popconfirm title='Do you want to delete this product?' onConfirm={() => handleDelete(record)} placement="topLeft" okText="Yes" cancelText="No" >
            <a>x</a>
          </Popconfirm>

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
      image: item.product.image,
      name: item.product.name,
      price: item.product.price * item.quantities,
      quantity: item.quantities,
    }

  })
  const totalPrice = cart.reduce((pre, current) => {

    return pre + current.product.price * current.quantities
  }, 0)



  return (
    <div>

      <Table pagination={false} columns={columns} dataSource={data}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text type="danger">{cart.length}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text>{totalPrice}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />
    </div>
  )
}

export default Cart