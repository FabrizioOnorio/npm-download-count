import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>npm downloads</title>
        <meta name="find the number of downloads for the npm packages you like and visualise them with Victory" content="npm downloads search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  )
}

export default Home
