import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col bg-white shadow-[0px_0px_16px_rgba(50,_50,_50,_0.05)]">
        <Header />
        <Outlet />
        <Navigation />
      </div>
    </div>
  );
}
