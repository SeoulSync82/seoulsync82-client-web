import { Icon, IconProps, NavbarIcon } from '../button/types';
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
  IcoHeaderLogo,
  IcoHeaderTypo,
  IcoAlarm,
  IcoSearch,
} from '../icons';

export default function SVGIcon({
  width = 24,
  height = 24,
  name,
  active = false,
  onClick,
}: IconProps) {
  const iconTypes: Record<Icon, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
    Home: active ? IcoHomeActive : IcoHome,
    MyCourse: active ? IcoMyCourseActive : IcoMyCourse,
    AiRecommend: IcoAiRecommend,
    Community: active ? IcoCommunityActive : IcoCommunity,
    MyPage: active ? IcoMyPageActive : IcoMyPage,
    HeaderTypo: IcoHeaderTypo,
    HeaderLogo: IcoHeaderLogo,
    Alarm: IcoAlarm,
    Search: IcoSearch,
  };
  const IconComponent = iconTypes[name as Icon];

  return <>{IconComponent && <IconComponent width={width} height={height} onClick={onClick} />}</>;
}
