import React from 'react'
import axiosConfig from '../../axiosConfig'
import {Row,Col,Image} from 'antd'

const ProducDetail = ({product}) => {
  console.log(product)
  return (
    <div>
      <Row gutter={[16,24]}>
        <Col xs={12}>
          <Image width={'100%'} src={product.image} alt="" />
        </Col>
        <Col xs={12}>
          a
        </Col>
      </Row>
    </div>
  )
}

export default ProducDetail

export async function getServerSideProps(context) {
  const {query} = context
  const res = await axiosConfig.get(`/list-products/${query.productId}`)
  console.log(res.data)
  return {
    props: {
      product: res.data
    }, // will be passed to the page component as props
  }
}