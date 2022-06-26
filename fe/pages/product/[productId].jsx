import React, { useState } from 'react'
import axiosConfig from '../../axiosConfig'
import { Row, Col, Image, Typography, Button, Space, InputNumber } from 'antd'
import css from '../../styles/Detail.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { CartSlice } from '../../redux/cartReducer'
import Comments from '../../components/Comments'

const { Paragraph, Title } = Typography;


const ProducDetail = ({ product }) => {
  const [qtt, setQtt] = useState(1)
  const dispath = useDispatch()
 


  const handleQuantities = (e) => {
    setQtt(e)
  }
  const handleAddToCart = () => {

    dispath(CartSlice.actions.add({
      product,
      quantities: qtt
    }))
  }


  return (
    <div className={css.container}>
      <Row gutter={[16, 24]}>
        <Col xs={12}>
          <Image width={'100%'} src={product.image} alt="" />
        </Col>
        <Col xs={12}>
          <Title level={3} className={css.category}>{product.category.name}</Title>
          <h4  >{product.name}</h4 >
          <div className={css.price}>
            <Title level={5}>Price:</Title >

            <h3 color='black'>{product.price}</h3>
          </div>
          <Paragraph className={css.paragraph}>{product.description}</Paragraph>
          <div>
            <Title level={5}>Colors</Title >
            <Space size={[8, 16]}>
              {product.color.map(item => {

                return <Button key={item.id}>
                  {item.name}
                </Button>
              })}
            </Space>

          </div>
          <div>
            <Title level={5}>Quantites</Title >
            <Space size={[8, 16]}>
              <InputNumber min={1} max={10} value={qtt} onChange={(e) => handleQuantities(e)} />
              <Button onClick={handleAddToCart} danger type="primary" shape='round' size='large'> ADD TO CART</Button>
            </Space>

          </div>


        </Col>
      </Row>
      <Comments product_id={product.uuid}/>
      
    </div>
  )
}

export default ProducDetail

export async function getServerSideProps(context) {
  const { query } = context
  const res = await axiosConfig.get(`/list-products/${query.productId}`)
 
  return {
    props: {
      product: res.data
    }, // will be passed to the page component as props
  }
}