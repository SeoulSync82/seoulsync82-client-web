import { Outlet } from 'react-router';

export default function DefaultLayout() {
  return (
    <div className="font-NotoSans bg-gray-50">
      <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col bg-white shadow-[0px_0px_16px_rgba(50,_50,_50,_0.05)]">
        <Outlet />
      </div>
    </div>
  );
}
