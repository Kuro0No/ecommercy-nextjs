import React, { useEffect, memo, useRef } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/reducer'
import { Card, Col, Row } from 'antd';
import css from '../../styles/product.module.scss'
import { useRouter } from 'next/router';
import Link from 'next/link';
const { Meta } = Card;
import { Breadcrumb, Layout, Menu } from 'antd';
import ProductCommonLayOut from '../../components/ProductCommonLayOut'
import store from '../../redux/store';
import Header from '../../components/Header';

const { Content, Footer, Sider } = Layout;

const Product = () => {
  const dispath = useDispatch()
  const router = useRouter()
  const { products, loading } = useSelector(state => state.products)
  console.log({products})

  return (
    <Row className={css.container} gutter={[16, 24]}>
      {products.map(item => {
        return <Link key={item.uuid} href={`/product/${item.uuid}`}>
          <Col >
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img className={css.coverImage} alt="example" src={item.image} />}
            >
              <Meta title={item.name} description={item.price} />
            </Card>
          </Col>
        </Link>

      })}
    </Row >
  )
}

export default Product



Product.getLayOut = function PageLayOut(page) {
  return <Provider store={store}>

    <Layout style={{background: '#fff'}}>
      <Header />
      <Layout >

        <Sider  theme='light'>
          <Menu>
            <ProductCommonLayOut />
          </Menu>
        </Sider>
        <Layout>
          <Content>
            {page}

          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Provider >

}