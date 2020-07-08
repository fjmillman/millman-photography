import { useState } from 'react';

import Overlay from '.';

export default {
  title: 'Components/Overlay',
  component: Overlay,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Open Overlay
      </button>
      <Overlay isOpen={isOpen} onClose={handleClose} ariaLabel="Overlay">
        <div className="overlay-container">
          <p>This is an overlay</p>
        </div>
      </Overlay>
      <style jsx>{`
        .overlay-container {
          height: 50%;
          width: 50%;
          padding: 0.5rem;
          background-color: white;
        }
      `}</style>
    </>
  );
};
