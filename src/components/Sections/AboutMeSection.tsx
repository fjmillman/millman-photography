import { FC } from 'react';
import Img from 'react-optimized-image';

import Portrait from 'images/portrait.jpg';

const AboutMeSection: FC = () => (
  <section>
    <h1>About Me</h1>
    <h2>Find out more about me and who I am</h2>
    <div className="content">
      <div className="portrait">
        <Img src={Portrait} />
      </div>
      <p>
        I first picked up the camera in 2014 when I joined the University of
        Bath Photography Society in my first year of study, and I haven&apos;t
        looked back since. Currently I live in the beautiful royal town of
        Windsor in Berkshire, but I was raised in North Yorkshire which is home
        to some incredible landscapes.
      </p>
    </div>
    <style jsx>{`
      section {
        color: white;
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
        margin-bottom: var(--size-8);
        text-align: center;
      }

      p {
        display: block;
        margin: auto;
      }

      .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--size-88), 1fr));
        grid-gap: var(--size-4);
      }

      .portrait {
        display: block;
        max-width: var(--size-88);
        margin: auto;
      }
    `}</style>
  </section>
);

export default AboutMeSection;
