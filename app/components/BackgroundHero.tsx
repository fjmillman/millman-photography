import type { FC } from 'react';

import example from '~/images/example-2.jpg';

const BackgroundHero: FC = () => (
  <section
    style={{ backgroundImage: example }}
    className="fixed top-0 left-0 h-full w-full -z-1 object-contain object-[50%]"
  />
);

export default BackgroundHero;
