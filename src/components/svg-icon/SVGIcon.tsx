import { IconProps, NavbarIcon } from '../button/types';
import {
  IcoMyPage,
  IcoAiRecommend,
  IcoHome,
  IcoMyCourse,
  IcoCommunity,
  IcoHomeActive,
  IcoMyCourseActive,
  IcoCommunityActive,
  IcoMyPageActive,
} from '../icons';

export default function SVGIcon({ width = 24, height = 24, name, active, onClick }: IconProps) {
  const iconTypes: Record<NavbarIcon, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
    Home: active ? IcoHomeActive : IcoHome,
    MyCourse: active ? IcoMyCourseActive : IcoMyCourse,
    AiRecommend: IcoAiRecommend,
    Community: active ? IcoCommunityActive : IcoCommunity,
    MyPage: active ? IcoMyPageActive : IcoMyPage,
  };
  const IconComponent = iconTypes[name as NavbarIcon];

  return <>{IconComponent && <IconComponent width={width} height={height} onClick={onClick} />}</>;
}
