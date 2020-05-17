import NavigationBar from './components/NavigationBar';

interface Props {
  children: JSX.Element[];
}

const Layout = ({ children }: Props) => (
  <>
    <NavigationBar />
    {children}
  </>
);

export default Layout;
