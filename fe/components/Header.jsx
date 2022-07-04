import React, { useState } from 'react'
import style from '../styles/Header.module.scss'
import Link from 'next/link';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { forwardRef } from 'react';
import { Typography, Input, Badge, List, Avatamr, Cascader } from 'antd';
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Search } = Input;



const Header = () => {
  const { cart } = useSelector(state => state.cart)
  const router = useRouter()
  const { query } = router
  const [search, setSearch] = useState()
  const onSearch = (e) => {
    setSearch(e)
    // router.push({
    //   query: {
    //     ...(query.category) && { category: query.category },
    //     ...(query.sort) && { sort: query.sort },
    //     ...(query.color) && { color: query.color },
    //     search: e
    //   }
    // })
  }
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <div className={style.container}>


      <Typography.Title level={2}>
        <Link href="/">
          <a >HomePage</a>
        </Link>
      </Typography.Title>
      <Typography.Title level={2}>
        <Link href="/product">
          <a >Shop</a>
        </Link>
      </Typography.Title>
      <div className={style.search}>
        <Search onSearch={(e) => onSearch(e)} className={style.input} size='large' placeholder="input search text" />
        <List
          className={style.showSearch}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
      <div className={style.right}>
        <Link href="/login">
          <UserOutlined className={style.icon} />

        </Link>

        <Link href="/cart">
          <Badge count={cart.length} className={style.icon}>

            <ShoppingCartOutlined />
          </Badge>
        </Link>
      </div>

    </div>
  )
}

export default Header

