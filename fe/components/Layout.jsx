import Header from './Header'
import { Row,Col } from 'antd'

export default function  Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
     
    </>
  )
}