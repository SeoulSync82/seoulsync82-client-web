import { NavbarIcon, NavbarIconActive } from '../Navigation/types';

export type SVGName =
  | NavbarIcon
  | NavbarIconActive
  // | SNSIcon
  | 'Alarm'
  | 'Search'
  | 'MenuLogo'
  | 'HeaderTypo'
  | 'HeaderLogo'
  | 'DownTriangle'
  | 'SplashLogo'
  | 'LogoSeoulsync'
  | 'ArrowLeft'
  | 'Cancel'
  | 'Line'
  | 'Plus'
  | 'FullStar'
  | 'Restaurant'
  | 'Cafe'
  | 'Bar'
  | 'Shopping'
  | 'Culture'
  | 'Entertainment'
  | 'Logo';

export type SNSType = 'kakao' | 'naver' | 'google';

export type IconProps = {
  name: SVGName | string;
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
  style?: string;
  onClick?: () => void;
  className?: string;
};
