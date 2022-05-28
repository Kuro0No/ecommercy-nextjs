import '../styles/globals.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Layout from '../components/Layout'
import ProductCommonLayOut from '../components/ProductCommonLayOut';
import { Provider } from 'react-redux'
import store from '../redux/store'



function MyApp({ Component, pageProps }) {


  if (Component.getLayOut) {

    return Component.getLayOut(
      <Provider store={store}>
        <Layout>
          <ProductCommonLayOut>
            <Component  {...pageProps} />
          </ProductCommonLayOut>

        </Layout>
      </Provider>

    )

  }

  return <Provider store={store}>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
}

export default MyApp
