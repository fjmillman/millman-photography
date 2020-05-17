import Link from 'next/link';

const NavigationBar = () => (
  <ul>
    <li>
      <Link href="/">
        <button type="button">Home</button>
      </Link>
    </li>
    <li>
      <Link href="/blog">
        <button type="button">Blog</button>
      </Link>
    </li>
    <li>
      <Link href="/gallery">
        <button type="button">Gallery</button>
      </Link>
    </li>
  </ul>
);

export default NavigationBar;
