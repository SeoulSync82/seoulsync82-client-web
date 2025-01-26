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
  IcoArrowLeft,
  IcoKakao,
  IcoNaver,
  IcoGoogle,
  IcoDownTriangle,
  LogoSeoulsync,
} from '../icons';
import { IconProps, SVGName } from './type';

export default function SVGIcon({
  width = 24,
  height = 24,
  name,
  active = false,
  onClick,
}: IconProps) {
  const svgTypes: Record<SVGName, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
    Home: active ? IcoHomeActive : IcoHome,
    MyCourse: active ? IcoMyCourseActive : IcoMyCourse,
    AiRecommend: IcoAiRecommend,
    Community: active ? IcoCommunityActive : IcoCommunity,
    MyPage: active ? IcoMyPageActive : IcoMyPage,
    HeaderTypo: IcoHeaderTypo,
    HeaderLogo: IcoHeaderLogo,
    Alarm: IcoAlarm,
    Search: IcoSearch,
    ArrowLeft: IcoArrowLeft,
    Kakao: IcoKakao,
    Naver: IcoNaver,
    Google: IcoGoogle,
    DownTriangle: IcoDownTriangle,
    LogoSeoulsync: LogoSeoulsync,
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
  const SvgComponent = svgTypes[name as SVGName];

  return <>{SvgComponent && <SvgComponent width={width} height={height} onClick={onClick} />}</>;
}
