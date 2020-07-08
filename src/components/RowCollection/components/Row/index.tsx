import { FC } from 'react';

import { Image } from '../../../../controllers/Types';

interface Props {
  coverImage?: Image;
}

const Row: FC<Props> = ({ children, coverImage }) => (
  <div className="row">
    {children}
    <style jsx>{`
      .row {
        background-color: var(--colour-white);
        border-radius: var(--size-2);
        box-shadow: 0 var(--size-1) var(--size-12) rgba(0, 0, 0, 0.2);
      }

      .row:not(:last-child) {
        margin-bottom: var(--size-12);
      }
    `}</style>
    <style jsx>{`
      .row {
        ${coverImage &&
        `
          background-image: url(${coverImage.url});
          background-size: cover;
          background-repeat: no-repeat;
        `}
      }
    `}</style>
  </div>
);

export default Row;
