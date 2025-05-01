import { cn } from '@/utils/tailwindcss';
import TabButton from './TabButton';

const TabButtonGroup = ({
  tabType,
  tabItems,
  onClickTab,
}: {
  tabType: string;
  tabItems: { type: string; label: string }[];
  onClickTab: (tabType: string) => void;
}) => (
  <div className="flex w-full">
    {tabItems.map((item, idx) => (
      <TabButton
        key={`tab-${idx}`}
        active={tabType === item.type}
        onClick={() => onClickTab(item.type)}
        className={cn('flex-1')}
      >
        {item.label}
      </TabButton>
    ))}
  </div>
);

export default TabButtonGroup;
