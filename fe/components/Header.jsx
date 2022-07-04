import React from 'react'
import style from '../styles/Header.module.scss'
import Link from 'next/link';
const { Search } = Input;
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { forwardRef } from 'react';
import { Typography, Input, Badge } from 'antd';
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'



const Header = () => {
  const { cart } = useSelector(state => state.cart)

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
     

      <Search className={style.input} size='large' placeholder="input search text" />
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

