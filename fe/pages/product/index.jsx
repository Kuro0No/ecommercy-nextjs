import React, { useEffect, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/reducer'
import { Card, Col, Row } from 'antd';
import css from '../../styles/product.module.scss'
import { useRouter } from 'next/router';
import Link from 'next/link';
const { Meta } = Card;

const Product = () => {
  const dispath = useDispatch()
  const router = useRouter()
  const { products, loading } = useSelector(state => state.products)





  // useEffect(() => {
  //   dispath(getProducts(router.query.category))

  // }, [])

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
  return <>
    {page}
  </>
}