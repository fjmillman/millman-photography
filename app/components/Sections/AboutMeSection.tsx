import type { FC } from 'react';

import portrait from '~/images/portrait.jpg';

const AboutMeSection: FC = () => (
  <section className="max-h-[500px] py-8">
    <h1 className="text-xl font-bold mb-1 text-center">About Me</h1>
    <h2 className="text-lg mb-8 text-center">Find out more about me and who I am</h2>
    <div className="grid gap-8 grid-cols-[auto-fit_minmax(800px,_1fr)]">
      <div className="block max-w-[400px] m-auto">
        <img src={portrait} alt="portait" height={350} width={500} />
      </div>
      <p className="block m-auto">
        I first picked up the camera in 2014 when I joined the University of Bath Photography Society in my first year
        of study, and I haven&apos;t looked back since. Currently I live in the beautiful royal town of Windsor in
        Berkshire, but I was raised in North Yorkshire which is home to some incredible landscapes.
      </p>
    </div>
  </section>
);

export default AboutMeSection;
