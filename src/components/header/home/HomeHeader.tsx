import SVGIcon from '@/components/svg-icon/SVGIcon';
import { Link } from 'react-router';

export default function HomeHeader() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex items-center gap-[8px]">
        <SVGIcon width={28} height={36} name="HeaderLogo" />
        <SVGIcon width={72} height={32} name="HeaderTypo" />
      </div>
      <div className="flex max-w-[72px] items-center gap-[8px]">
        <Link to="/notifications">
          <SVGIcon className="mr-2" width={32} height={32} name="Alarm" active={false} />
        </Link>
        <SVGIcon width={32} height={32} name="Search" />
      </div>
    </div>
  );
}
