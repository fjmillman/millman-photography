import { useContext, FC } from 'react';
import Link from 'next/link';
import Image from 'react-optimized-image';

import PageContext from 'context/PageContext';
import useAuthentication from 'hooks/useAuthentication';
import Logo from 'images/signature.png';
import MenuIcon from 'icons/menu-icon.svg';
import Sidebar from '../Sidebar';
import LoginModal from '../Modals/LoginModal';
import IconButton from '../Buttons/IconButton';
import useSidebar from '../Sidebar/hooks/useSidebar';
import useLoginModal from '../Modals/LoginModal/hooks/useLoginModal';
import NavigationBar from '../NavigationBar';
import NavigationButton from '../Buttons/NavigationButton';

const Header: FC = () => {
  const { isDesktopView } = useContext(PageContext);

  const {
    state: { isSidebarOpen },
    actions: { handleOpenSidebar, handleCloseSidebar },
  } = useSidebar();

  const {
    state: { isLoggedIn },
    actions: { handleLogout },
  } = useAuthentication();

  const {
    state: { isLoginModalOpen },
    actions: { handleOpenLoginModal, handleCloseLoginModal },
  } = useLoginModal();

  const authenticationButton = isLoggedIn ? (
    <NavigationButton onClick={handleLogout} ariaLabel="Log out">
      <p>Logout</p>
    </NavigationButton>
  ) : (
    <NavigationButton
      onClick={handleOpenLoginModal}
      ariaLabel="Open Login Modal"
    >
      <p>Log in</p>
    </NavigationButton>
  );

  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src={Logo}
            alt="Millman Photography Logo"
            webp
            sizes={[125]}
            width={125}
          />
        </Link>
        {!isDesktopView ? (
          <>
            <IconButton onClick={handleOpenSidebar} ariaLabel="Open Menu">
              <Image src={MenuIcon} />
            </IconButton>
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={handleCloseSidebar}
              ariaLabel="Menu"
            >
              <Sidebar.Header>
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="Millman Photography Logo"
                    webp
                    sizes={[125]}
                    width={125}
                  />
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
      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          width: var(--size-full);
          padding: var(--size-4);
          background-color: var(--colour-white);
          box-shadow: 0 var(--size-2) var(--size-4) rgba(0, 0, 0, 0.2);
        }

        header > div {
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--screen-lg);
        }
      `}</style>
    </header>
  );
};

export default Header;
