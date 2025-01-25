import { NavbarIcon, NavbarIconActive } from '../navigation/types';

export type Icon =
  | NavbarIcon
  | NavbarIconActive
  | SNSIcon
  | 'Alarm'
  | 'Search'
  | 'LeftArrow'
  | 'MenuLogo'
  | 'HeaderTypo'
  | 'HeaderLogo';

export type SNSIcon = 'Kakao' | 'Naver' | 'Google';

export type IconProps = {
  name: Icon | string;
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
  style?: string;
  onClick?: () => void;
};
