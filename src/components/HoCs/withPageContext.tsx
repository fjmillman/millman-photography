/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { AppProps } from 'next/app';

import { PageContextProvider } from 'context/PageContext';

function withPageContext<P = {}>(PageComponent: FC<AppProps<P>>) {
  return (props: AppProps<P>) => (
    <PageContextProvider>
      <PageComponent {...props} />
    </PageContextProvider>
  );
}

export default withPageContext;
