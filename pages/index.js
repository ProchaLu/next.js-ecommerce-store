import Head from 'next/head';
/* import Feature from '../components/Feature'; */
import HeroImage from '../components/HeroImage';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Football Jersey Shop</title>
      </Head>
      <SearchBar />
      <HeroImage />
      {/*  <Feature /> */}
    </Layout>
  );
}
