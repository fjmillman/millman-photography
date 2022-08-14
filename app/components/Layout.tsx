import type { User } from '@prisma/client';
import type { FC, PropsWithChildren } from 'react';

import Header from './Header';

type Props = PropsWithChildren<{
  user: User | null;
}>;

const Layout: FC<Props> = ({ user, children }) => (
  <div className="flex flex-col min-h-full w-full">
    <Header user={user} />
    <main className="w-full">
      <div className="max-w-screen-lg m-auto p-12">{children}</div>
    </main>
  </div>
);

export default Layout;
