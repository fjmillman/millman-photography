import { useEffect, useState, DOMAttributes } from 'react';

const useOverlay = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const html = document.querySelector('html');

    if (!html) {
      return;
    }

    if (!isOpen) {
      html.classList.remove('scroll-lock');
      return;
    }

    html.classList.add('scroll-lock');
  }, [isOpen]);

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const handleClickAway: DOMAttributes<HTMLElement>['onClick'] = (e) =>
    ref && !ref.contains(e.target as Node) && onClose();

  return {
    setRef,
    handleClickAway,
  };
};

export default useOverlay;
