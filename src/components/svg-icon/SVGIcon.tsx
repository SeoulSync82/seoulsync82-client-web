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
  IcoLeftArrow,
  // LogoSeoulsync,
  IcoKakao,
  IcoNaver,
  IcoGoogle,
} from '../icons';
import { Icon, IconProps } from './type';

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
    LeftArrow: IcoLeftArrow,
    Kakao: IcoKakao,
    Naver: IcoNaver,
    Google: IcoGoogle,
    // SeoulSync: LogoSeoulsync,
    // downTriangle: IcoDownTriangle,
    // cancelIcon: IcoCancel,
    // lineIcon: IcoLine,
    // plusIcon: IcoPlus,
    // fullStartIcon: IcoFullStart,
    // restaurantIcon: IcoRestaurant,
    // cafeIcon: cafeIcon,
    // barIcon: barIcon,
    // shoppingIcon: shoppingIcon,
    // cultureIcon: cultureIcon,
    // entertainmentIcon: entertainmentIcon,
    // logoIcon: logoIcon,
  };
  const IconComponent = iconTypes[name as Icon];

  return <>{IconComponent && <IconComponent width={width} height={height} onClick={onClick} />}</>;
}
