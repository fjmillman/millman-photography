import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title?: string;
}

const Page: FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title && `${title} - `}Millman Photography</title>
    </Head>
    {children}
  </>
);

export default Page;
