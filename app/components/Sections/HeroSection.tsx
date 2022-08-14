import type { FC } from 'react';

import logo from '~/images/signature.png';

import BackgroundHero from '../BackgroundHero';

const HeroSection: FC = () => (
  <section className="flex flex-col items-center min-h-[800px] pt-12">
    <BackgroundHero />
    <div className="w-52 mb-2">
      <img src={logo} alt="logo" height={250} width={600} />
    </div>
    <h1 className="text-xl font-bold text-center">Photography by Freddie John Millman</h1>
  </section>
);

export default HeroSection;
