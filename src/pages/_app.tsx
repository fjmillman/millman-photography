/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import wrapper from 'store';
import Layout from 'components/Layout';
import withPageContext from 'components/HoCs/withPageContext';
import useStartup from 'hooks/useStartup';

import 'styles/index.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { hasMounted } = useStartup();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(withPageContext(App));
