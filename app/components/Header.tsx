import type { User } from '@prisma/client';
import { Link, useSubmit, useTransition } from '@remix-run/react';
import type { FC } from 'react';

import useWindowWidth from '~/hooks/useWindowWidth';
import menuIcon from '~/icons/menu-icon.svg';
import logo from '~/images/signature.png';

import IconButton from './Buttons/IconButton';
import NavigationButton from './Buttons/NavigationButton';
import LoginModal from './LoginModal';
import useLoginModal from './LoginModal/hooks/useLoginModal';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import useSidebar from './Sidebar/hooks/useSidebar';

type Props = {
  user: User | null;
};

const Header: FC<Props> = ({ user }) => {
  const width = useWindowWidth();

  const {
    state: { isSidebarOpen },
    actions: { handleOpenSidebar, handleCloseSidebar },
  } = useSidebar();

  const {
    state: { isLoginModalOpen },
    actions: { handleOpenLoginModal, handleCloseLoginModal },
  } = useLoginModal();

  const submit = useSubmit();
  const { state } = useTransition();

  const authenticationButton = user ? (
    <NavigationButton
      onClick={() => submit(null, { method: 'post', action: '/logout' })}
      ariaLabel="Log out"
      disabled={state === 'submitting'}
    >
      <p>{state === 'submitting' ? 'Logging out' : 'Logout'}</p>
    </NavigationButton>
  ) : (
    <NavigationButton onClick={handleOpenLoginModal} ariaLabel="Open Login Modal">
      <p>Log in</p>
    </NavigationButton>
  );

  return (
    <header className="sticky t-0 p-4 bg-white shadow-lg">
      <div className="flex flex-row align-center justify-between max-w-screen-lg m-auto">
        <Link to="/">
          <img src={logo} alt="Millman Photography Logo" width={125} />
        </Link>
        {width < 1028 ? (
          <>
            <IconButton onClick={handleOpenSidebar} ariaLabel="Open Menu">
              <img src={menuIcon} alt="menu" />
            </IconButton>
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} ariaLabel="Menu">
              <Sidebar.Header>
                <Link to="/">
                  <img src={logo} alt="Millman Photography Logo" width={125} />
                </Link>
              </Sidebar.Header>
              <Sidebar.Content>
                <NavigationBar />
              </Sidebar.Content>
              <Sidebar.Footer>{authenticationButton}</Sidebar.Footer>
            </Sidebar>
          </>
        ) : (
          <>
            <NavigationBar />
            {authenticationButton}
          </>
        )}
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </div>
    </header>
  );
};

export default Header;
