import TabButton from "@/components/buttons/tab";
import clsx from "clsx";
import { useLocation } from "react-router";

export default function Culture() {
  const tabItems = [
    {
      label: '전시',
      type: 'exhibitions',
    },
    {
      label: '팝업',
      type: 'popups',
    },
  ];
  const { pathname, search } = useLocation();

  return (
    <div className="page w-full">
      <div className="flex w-full">
        {tabItems.map((item, idx) => (
          <TabButton
            key={`tab-${idx}`}
            title={item.label}
            active={search.split('=')[1] === item.type}
            href={`${pathname}?type=${item.type}`}
            className={clsx('flex-1')}
          />
        ))}
      </div>
      <div className="w-full overflow-y-scroll">culture</div>
    </div>
  );
}
