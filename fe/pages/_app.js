import '../styles/globals.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Layout from '../components/Layout'
import ProductCommonLayOut from '../components/ProductCommonLayOut';




function MyApp({ Component, pageProps }) {

  if (Component.getLayOut) {

    return Component.getLayOut(
      <Layout>
        <ProductCommonLayOut>

          <Component {...pageProps} />
        </ProductCommonLayOut>

      </Layout>
    )

  }

  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
