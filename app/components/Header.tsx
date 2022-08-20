import type { User } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, useSubmit, useTransition } from '@remix-run/react';
import type { FC } from 'react';
import { useState } from 'react';

import useWindowWidth from '~/hooks/useWindowWidth';
import closeIcon from '~/icons/close-icon.svg';
import menuIcon from '~/icons/menu-icon.svg';
import logo from '~/images/signature.png';

import IconButton from './Buttons/IconButton';
import NavigationButton from './Buttons/NavigationButton';
import LoginModal from './LoginModal';
import NavigationBar from './NavigationBar';

type Props = {
  user: User | null;
};

const Header: FC<Props> = ({ user }) => {
  const width = useWindowWidth();

  const submit = useSubmit();
  const { state } = useTransition();

  const [open, setOpen] = useState(false);

  const authenticationButton = user ? (
    <NavigationButton
      onClick={() => submit(null, { method: 'post', action: '/logout' })}
      ariaLabel="Log out"
      disabled={state === 'submitting'}
    >
      <p>{state === 'submitting' ? 'Logging out' : 'Logout'}</p>
    </NavigationButton>
  ) : (
    <LoginModal />
  );

  return (
    <header className="sticky t-0 p-4 bg-white shadow-lg">
      <div className="flex flex-row align-center justify-between max-w-screen-lg m-auto">
        <Link to="/">
          <img src={logo} alt="Millman Photography Logo" width={125} />
        </Link>
        {width < 1028 ? (
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <IconButton onClick={() => setOpen(true)} ariaLabel="Open Menu">
                <img src={menuIcon} alt="menu" />
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content className="fixed top-0 right-0 h-full w-[90vw] max-w-[450px] p-[25px] bg-white rounded-md shadow-md">
                <div className="flex flex-col space-between">
                  <Dialog.Title className="flex-shrink mb-6">
                    <Link to="/">
                      <img src={logo} alt="Millman Photography Logo" width={125} />
                    </Link>
                  </Dialog.Title>
                  <div className="flex-grow">
                    <NavigationBar />
                  </div>
                  <div className="flex-shrink">{authenticationButton}</div>
                  <Dialog.Close className="absolute top-2 right-2">
                    <IconButton onClick={() => setOpen(false)}>
                      <img src={closeIcon} alt="close icon" />
                    </IconButton>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <>
            <NavigationBar />
            {authenticationButton}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
