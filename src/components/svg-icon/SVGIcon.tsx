import { IconProps, IconType } from '../button/types';
import {
  IcoProfile,
  IcoAiRecommend,
  IcoHome,
  IcoMyCourse,
  IcoCommunity,
  IcoHomeActive,
  IcoMyCourseActive,
  IcoCommunityActive,
  IcoProfileActive,
} from '../icons';

export default function SVGIcon({
  width = 24,
  height = 24,
  name,
  active,
  onClick,
  color,
}: IconProps) {
  const iconTypes: Record<IconType, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
    Home: active ? IcoHomeActive : IcoHome,
    MyCourse: active ? IcoMyCourseActive : IcoMyCourse,
    AiRecommend: IcoAiRecommend,
    Community: active ? IcoCommunityActive : IcoCommunity,
    Profile: active ? IcoProfileActive : IcoProfile,
  };
  const IconComponent = iconTypes[name as IconType];

  return (
    <>
      {IconComponent && (
        <IconComponent
          width={width}
          height={height}
          // fill={color || (active ? 'primary-800' : '#ADB5BD')}
          // stroke={color || (active ? 'primary-800' : 'none')}
          onClick={onClick}
        />
      )}
    </>
  );
}
