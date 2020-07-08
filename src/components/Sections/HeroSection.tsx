import { FC } from 'react';
import Img from 'react-optimized-image';

import BackgroundHero from '../BackgroundHero';

import Logo from '../../images/signature.png';

const HeroSection: FC = () => (
  <section>
    <BackgroundHero />
    <div className="logo">
      <Img src={Logo} sizes={[200]} inline webp />
    </div>
    <h1>Photography by Freddie John Millman</h1>
    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(var(--size-screen-h) - var(--size-32));
        padding-top: var(--size-12);
      }

      .logo {
        width: 200px;
        margin-bottom: var(--size-2);
      }

      h1 {
        font-size: var(--size-6);
        font-weight: bold;
        text-align: center;
      }
    `}</style>
  </section>
);

export default HeroSection;
