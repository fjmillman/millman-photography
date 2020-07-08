import { FC } from 'react';

import { Image } from '../../../../controllers/Types';

interface Props {
  coverImage?: Image;
}

const Card: FC<Props> = ({ children, coverImage }) => (
  <div className="card">
    {children}
    <style jsx>{`
      .card {
        height: var(--size-48);
        min-width: var(--size-48);
        background-color: var(--colour-white);
        border-radius: var(--size-2);
        box-shadow: 0 var(--size-4) var(--size-12) rgba(0, 0, 0, 0.2);
      }
    `}</style>
    <style jsx>{`
      .card {
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

export default Card;
