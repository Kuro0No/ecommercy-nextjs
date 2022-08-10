import React, { useId, useState } from 'react'
import axiosConfig from '../../axiosConfig'
import { Row, Col, Image, Typography, Button, Space, InputNumber, Radio } from 'antd'
import css from '../../styles/Detail.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { CartSlice } from '../../redux/cartReducer'
import Comments from '../../components/Comments'

const { Paragraph, Title } = Typography;


const ProducDetail = ({ product }) => {
  const [qtt, setQtt] = useState(1)
  const dispath = useDispatch()
  const [color, setColor] = useState()


  const handleQuantities = (e) => {
    setQtt(e)
  }
  const handleAddToCart = () => {
    if (color) {
      dispath(CartSlice.actions.add({
        product,
        quantities: qtt,
        color,
        id: Math.floor(Math.random() * 1000)
        
      }))
    } else {
      alert('You dont choose the color')
    }
  }
  const handleColor = e => {
    setColor(e.target.value)
  }
  return (
    <div className={css.container}>
      <Row gutter={[16, 24]}>
        <Col xs={10}>
          <Image height={700} width={'100%'} src={product.image} alt="" />
        </Col>
        <Col xs={14}>
          <Title level={3} className={css.category}>{product.category.name}</Title>
          <h4  >{product.name}</h4 >
          <div className={css.price}>
            <Title level={5}>Price:</Title >

            <h5 color='black'>{product.price}</h5>
          </div>
          <Paragraph className={css.paragraph}>{product.description}</Paragraph>
          <div>
            <Title level={5}>Colors</Title >
            <Space size={[8, 16]}>
              <Radio.Group  buttonStyle="solid" onChange={(e) => handleColor(e)}>
                {product.color.map(item => {

                  return <Radio.Button  value={item} key={item.id}>
                    {item.name}
                  </Radio.Button>
                })}
              </Radio.Group>
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
      <Comments product_id={product.uuid} />

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