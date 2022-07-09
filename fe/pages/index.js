import Head from 'next/head'
import Image from 'next/image'
import axiosConfig from '../axiosConfig'
import Banner from '../components/Banner'
import Policy from '../components/Policy'
import WeeklyDeal from '../components/WeeklyDeal'
import styles from '../styles/Home.module.scss'


export default function Home({ banner }) {
  

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Banner banner={banner} />
        <Policy />
        <WeeklyDeal />
      </main>


    </div>
  )
}


export async function getStaticProps(context) {
  const res = await axiosConfig.get('/weeky-deal/')

  return {
    props: {
      banner: res.data
    },
    revalidate: 5
  }

}