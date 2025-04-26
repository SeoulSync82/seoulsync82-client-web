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
  IcoCancel,
  IcoLine,
  IcoPlus,
  IcoFullStar,
  IcoRestaurant,
  IcoCafe,
  IcoBar,
  IcoShopping,
  IcoCulture,
  IcoEntertainment,
  IcoLogo,
  IcoArrow,
  IcoHeart,
  IcoHeartActive,
  IcoRestaurantActive,
  IcoCafeActive,
  IcoBarActive,
  IcoShoppingActive,
  IcoCultureActive,
  IcoEntertainmentActive,
  IcoCheck,
  IcoApp,
  IcoBookmark,
  IcoBookmarkActive,
  IcoSpeaker,
  IcoWrite,
  IcoWriteActive,
} from '../Icon';
import { IconProps, SVGName } from './type';
import { cn } from '@/utils/tailwindcss';

export default function SvgIcon({
  width = 24,
  height = 24,
  name,
  active = false,
  onClick,
  className,
  color,
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
    kakao: IcoKakao,
    naver: IcoNaver,
    google: IcoGoogle,
    DownTriangle: IcoDownTriangle,
    LogoSeoulsync: LogoSeoulsync,
    Cancel: IcoCancel,
    Line: IcoLine,
    Plus: IcoPlus,
    FullStar: IcoFullStar,
    Restaurant: active ? IcoRestaurantActive : IcoRestaurant,
    Cafe: active ? IcoCafeActive : IcoCafe,
    Bar: active ? IcoBarActive : IcoBar,
    Shopping: active ? IcoShoppingActive : IcoShopping,
    Culture: active ? IcoCultureActive : IcoCulture,
    Entertainment: active ? IcoEntertainmentActive : IcoEntertainment,
    Logo: IcoLogo,
    Arrow: IcoArrow,
    Heart: active ? IcoHeartActive : IcoHeart,
    Bookmark: active ? IcoBookmarkActive : IcoBookmark,
    Write: active ? IcoWriteActive : IcoWrite,
    App: IcoApp,
    Notice: IcoSpeaker,
    Check: IcoCheck,
  };
  const SvgComponent = svgTypes[name as SVGName];

  return (
    <>
      {SvgComponent && (
        <SvgComponent
          width={width}
          color={color}
          height={height}
          onClick={onClick}
          className={cn(onClick && 'cursor-pointer', className)}
        />
      )}
    </>
  );
}
