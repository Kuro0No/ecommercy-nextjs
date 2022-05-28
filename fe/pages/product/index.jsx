import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/reducer'
import { Card, Col, Row } from 'antd';
import css from '../../styles/product.module.scss'

const { Meta } = Card;

const Product = () => {
  const dispath = useDispatch()
  const { products,loading } = useSelector(state => state.products)
  
  


  useEffect(() => {
    dispath(getProducts())
  }, [dispath])
  return (
    <Row className={css.container} gutter={[16, 24]}>
      {products.map(item => {
        return <Col  key={item.uuid}>
          <Card
            hoverable
            style={{ width: 240}}
            cover={<img className={css.coverImage} alt="example" src={item.image} />}
          >
            <Meta title={item.name} description={item.price} />
          </Card>
        </Col>

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