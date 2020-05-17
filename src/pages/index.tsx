import Head from 'next/head';
import { NextPage } from 'next';

import Layout from '../components/Layout';

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>Millman Photography</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Home</h1>
    </main>
  </Layout>
);

export default Home;
