import { Header } from '@/components/header';
import Navigation from '@/components/Navigation';
import { useLocation } from 'react-router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="overflow-hidden bg-gray-50">
      <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-white shadow-[0px_0px_16px_rgba(50,_50,_50,_0.05)]">
        <Header />
        {children}
        {pathname === '/login' ||
        pathname === '/ai-recommend' ||
        pathname.includes('/culture/') ? null : (
          <Navigation />
        )}
      </div>
    </div>
  );
}
