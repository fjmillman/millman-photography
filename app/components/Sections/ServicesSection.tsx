import type { FC } from 'react';

import icon from '~/icons/chevron-left.svg';

const ServicesSection: FC = () => (
  <section className="max-h-[500px] py-8">
    <div>
      <h1 className="text-xl font-bold mb-1 text-center">Services</h1>
      <h2 className="text-lg mb-4 text-center">What I can do for you</h2>
    </div>
    <div className="flex flex-row">
      <div className="flex flex-col items-center">
        <div className="w-20 mb-4">
          <img src={icon} alt="photography" height={100} width={100} />
        </div>
        <h3 className="text-lg font-bold mb-1 text-center">Photography</h3>
        <p>Perhaps you would like to give me my next challenge and commission me to capture a scene</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 mb-4">
          <img src={icon} alt="events" height={100} width={100} />
        </div>
        <h3 className="text-lg font-bold mb-1 text-center">Events</h3>
        <p>If you would like me to photograph an event, please get in touch with me</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-20 mb-4">
          <img src={icon} alt="prints" height={100} width={100} />
        </div>
        <h3 className="text-lg font-bold mb-1 text-center">Prints</h3>
        <p>My photography is available to you as prints and canvases, just let me know what you would like</p>
      </div>
    </div>
  </section>
);

export default ServicesSection;
