import { FC } from 'react';
import Img from 'react-optimized-image';

import Icon from 'icons/chevron-left.svg';

const ServicesSection: FC = () => (
  <section>
    <div>
      <h1>Services</h1>
      <h2>What I can do for you</h2>
    </div>
    <div className="grid">
      <div>
        <div className="icon">
          <Img src={Icon} inline />
        </div>
        <h3>Photography</h3>
        <p>
          Perhaps you would like to give me my next challenge and commission me
          to capture a scene
        </p>
      </div>
      <div>
        <div className="icon">
          <Img src={Icon} inline />
        </div>
        <h3>Events</h3>
        <p>
          If you would like me to photograph an event, please get in touch with
          me
        </p>
      </div>
      <div>
        <div className="icon">
          <Img src={Icon} inline />
        </div>
        <h3>Prints</h3>
        <p>
          My photography is available to you as prints and canvases, just let me
          know what you would like
        </p>
      </div>
    </div>
    <style jsx>{`
      section {
        color: var(--colour-white);
        min-height: var(--size-80);
        padding: var(--size-8) 0;
      }

      h1 {
        font-size: var(--size-6);
        font-weight: bold;
        margin-bottom: var(--size-1);
        text-align: center;
      }

      h2 {
        font-size: var(--size-4);
        margin-bottom: var(--size-4);
        text-align: center;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--size-56), 1fr));
        grid-gap: var(--size-4);
      }

      .grid > div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .icon {
        width: var(--size-20);
        margin-bottom: var(--size-4);
      }

      h3 {
        font-size: var(--size-4);
        font-weight: bold;
        margin-bottom: var(--size-1);
        text-align: center;
      }
    `}</style>
  </section>
);

export default ServicesSection;
