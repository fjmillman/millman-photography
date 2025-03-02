import type { FC, PropsWithChildren } from 'react';

import type { Image } from '~/prisma/generated';

type Props = PropsWithChildren<{
  coverImage?: Image;
}>;

const Row: FC<Props> = ({ children, coverImage }) => (
  <div
    style={
      coverImage
        ? {
            backgroundImage: `url('${coverImage.url}'`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }
        : {}
    }
    className="bg-white rounded-md shadow-md last:mb-3"
  >
    {children}
  </div>
);

export default Row;
