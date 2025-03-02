import type { FC, PropsWithChildren } from 'react';

import type { Image } from '~/prisma/generated';

type Props = PropsWithChildren<{
  coverImage?: Image;
}>;

const Card: FC<Props> = ({ children, coverImage }) => (
  <div
    style={
      coverImage
        ? {
            backgroundImage: `url('${coverImage.url}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }
        : {}
    }
    className="h-48 min-w-8 bg-white rounded-md shadow-md"
  >
    {children}
  </div>
);

export default Card;
