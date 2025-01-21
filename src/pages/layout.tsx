import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
        <Navigation />
      </main>
    </>
  );
};

export default Layout;
