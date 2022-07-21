import React, { useId, useState } from 'react'
import { Space, Table, Tag, Popconfirm, Typography, Empty, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { CartSlice } from '../redux/cartReducer';
import css from '../styles/cart.module.scss'
import CheckOutInCart from '../components/CheckOutInCart';

const { Text } = Typography





const Cart = () => {

  const [itemSelect, setItemSelect] = useState({
    length: 0,
    price: 0
  })
  const dispath = useDispatch()
  const { cart,itemSelected } = useSelector(state => state.cart)

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispath(CartSlice.actions.select(selectedRows))

    },
    selectedRowKeys : itemSelected.map(item => item.key)
  };


  const data = cart.map((item, index) => {

    return {
      uuid: item.product.uuid,
      key: item.id,
      image: item.product.image,
      name: item.product.name,
      price: item.product.price * item.quantities,
      quantity: item.quantities,
      color: item.color.name,
    }

  })


  const totalPrice = cart.reduce((pre, current) => {

    return pre + current.product.price * current.quantities
  }, 0)


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
        return <Link href={`/product/${record.uuid}`}>
          <a className={css.showproduct}>
            <img className={css.image} src={record.image} alt="cart" />
            <p>{record.name}</p>

          </a>
        </Link>
      },
      onCell: sharedOnCell,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
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

          <a style={{ fontSize: 20 }} onClick={() => handleIncrease(record)}>+</a>
          {record.quantity > 1 && <a onClick={() => handleDecrease(record)}>-</a>}
          {record.quantity == 1 &&
            <Popconfirm title='Do you want to delete this product?' onConfirm={() => handleDelete(record)} placement="topLeft" okText="Yes" cancelText="No" >
              <a style={{ fontSize: 20 }}>-</a>
            </Popconfirm>}
          <Popconfirm title='Do you want to delete this product?' onConfirm={() => handleDelete(record)} placement="topLeft" okText="Yes" cancelText="No" >
            <a style={{ fontSize: 20 }}>x</a>
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



  return (
    <div className={css.container}>

      <Table pagination={false} columns={columns} dataSource={data}
        locale={{ emptyText: <Empty description={<p>No Data. <Link href={'/product'}>Shop Now!</Link></p>} /> }}
        summary={() => {
          if (cart.length === 0) return

          return (<>

            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} index={0}>Total</Table.Summary.Cell>
              {/* <Table.Summary.Cell index={1}></Table.Summary.Cell> */}
              <Table.Summary.Cell index={2}>
                <Text type="danger">{cart.length}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text>{totalPrice}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3} index={0}>Selected Item</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text type="danger">{itemSelect.length}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text>{itemSelect.price}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Button>Purchase</Button>
              </Table.Summary.Cell>
            </Table.Summary.Row>


          </>
          )
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,

        }}
      />
      <CheckOutInCart itemSelected={itemSelected}/>
    </div>
  )
}

export default Cart