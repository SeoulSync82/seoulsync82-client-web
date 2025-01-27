import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function TabPage({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const tabItems = [
    { label: '좋아요 한 코스', type: 'bookmarked' },
    { label: '추천 받은 코스', type: 'recommended' },
  ];
  const location = useLocation();
  const onClickTabItem = (item) => {
    navigate(`/my-course?type=${item.type}`);
  };

  const activeTabType = useMemo(() => {
    const type = new URLSearchParams(location.search).get('type');
    if (!type) navigate(`/my-course?type=bookmarked`);
    return type || 'bookmarked';
  }, [location]);

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item) => (
          <TabButton
            key={item.label}
            active={activeTabType === item.type}
            title={item.label}
            onClick={() => onClickTabItem(item)}
            className={clsx('flex-1')}
          />
        ))}
      </div>
      <div className="w-full overflow-y-scroll">{children}</div>
    </div>
  );
}

const TabButton = ({ active, title, onClick, className }: any) => {
  const activeStyle = active
    ? 'border-b-2 border-gray-900 font-semibold text-gray-900'
    : 'border-b-[1px] border-gray-200 font-medium text-gray-300';
  return (
    <Button
      size="small"
      bgColor="white"
      className={clsx('flex h-[44px] w-full items-center justify-center', activeStyle, className)}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
