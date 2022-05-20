import React from 'react'

const Product = () => {
  return (
    <div>Product</div>
  )
}

export default Product


Product.getLayOut = function PageLayOut(page) {
  return <>
    {page}
  </>
}