import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/Header.module.scss'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { forwardRef } from 'react';
import { Typography, Input, Badge, List, Avatamr, Cascader, Avatar, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Search } = Input;
import { getSearchProducts } from '../redux/reducer'
import useDebounce from '../hooks/useDebounce'
import axiosConfig from '../axiosConfig';
import { userSlice } from '../redux/userReducer';
import jwt_decode from "jwt-decode";
import { baseUrl } from '../constant'



const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

const Header = () => {
  const { cart } = useSelector(state => state.cart)
  const router = useRouter()
  const { query } = router
  const dispath = useDispatch()
  const [search, setSearch] = useState()
  let params = new URLSearchParams(router.asPath.slice(9));
  const q = params.get('search')
  const [dataMenu, setDataMenu] = useState([])
  const [MenuHiden, setMenuHiden] = useState()
  const debounceSearchTerm = useDebounce(search, 500)
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    const user = localStorage.getItem('authToken') || null
    user && dispath(userSlice.actions.login(jwt_decode(user)))
  }, [])


  useEffect(() => {
    dispath(getSearchProducts(q))

  }, [])
  useEffect(() => {
    const a = debounceSearchTerm && document.querySelector(`.${style.showSearch}`)
    setMenuHiden(a)
  }, [debounceSearchTerm])

  const onSearch = (e) => {
    try {
      if (MenuHiden) MenuHiden.style.display = 'none'
      setSearch(e)
      dispath(getSearchProducts(e))
      router.push({
        pathname: '/product',
        query: {
          ...(query.category) && { category: query.category },
          ...(query.sort) && { sort: query.sort },
          ...(query.color) && { color: query.color },
          search: e
        }
      })

    } catch (eror) {
      alert(eror)
    }

  }



  useEffect(() => {
    if (search) {
      async function getData() {
        const res = await axiosConfig.get(`http://localhost:8000/api/list-products/?search=${search}`)
        setDataMenu(res.data.results)
      }
      getData()
    }
  }, [debounceSearchTerm])
  const onChange = (e) => {
    if (MenuHiden) MenuHiden.style.display = 'block'
    setSearch(e)

  }

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
        <Search onBlur={() => { if (MenuHiden) MenuHiden.style.display = 'none' }} onFocus={() => { if (MenuHiden) MenuHiden.style.display = 'block' }} onChange={e => onChange(e.target.value)} onSearch={(e) => onSearch(e)} className={style.input} size='large' placeholder="input search text" />
        {debounceSearchTerm && <List
          className={style.showSearch}
          itemLayout="horizontal"
          dataSource={dataMenu}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<Link href={`/product/${item.uuid}`} ><a >{item.name}</a></Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />}
      </div>
      <div className={style.right}>

        {!currentUser ? <Link href="/login">
          <UserOutlined className={style.icon} />

        </Link>
          :

          <Dropdown trigger={['click']} overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar src={`https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png `} />
              </Space>
            </a>
          </Dropdown>

        }

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

