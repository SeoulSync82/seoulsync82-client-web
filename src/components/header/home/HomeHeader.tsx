import SVGIcon from '@/components/SvgIcon';
import { useNavigate } from 'react-router';

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex items-center gap-[8px]">
        <SVGIcon width={28} height={36} name="HeaderLogo" />
        <SVGIcon width={72} height={32} name="HeaderTypo" />
      </div>
      <div className="flex max-w-[72px] items-center gap-[8px]">
        <SVGIcon
          className="mr-2"
          width={32}
          height={32}
          name="Alarm"
          active={false}
          onClick={() => navigate('/notifications')}
        />
        <SVGIcon width={32} height={32} name="Search" />
      </div>
    </div>
  );
}
