import { FC } from 'react';

import Header from '../Header';

const Layout: FC = ({ children }) => (
  <div className="layout">
    <Header />
    <main>
      <div>{children}</div>
    </main>
    <style jsx>{`
      .layout {
        flex-direction: column;
        min-height: var(--size-full);
      }

      main {
        width: var(--size-full);
        flex: 1 1 auto;
      }

      main > div {
        max-width: var(--screen-lg);
        margin: auto;
        padding: var(--size-12);
      }
    `}</style>
  </div>
);

export default Layout;
