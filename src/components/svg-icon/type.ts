import { NavbarIcon, NavbarIconActive } from '../navigation/types';

// export type Icon =
//   | NavbarIcon
//   | NavbarIconActive
//   | SNSIcon
//   | 'Alarm'
//   | 'Search'
//   | 'LeftArrow'
//   | 'MenuLogo'
//   | 'HeaderTypo'
//   | 'HeaderLogo'
//   | 'DownTriangle'
//   | SVGName;

export type SVGName =
  | NavbarIcon
  | NavbarIconActive
  | SNSIcon
  | 'Alarm'
  | 'Search'
  | 'LeftArrow'
  | 'MenuLogo'
  | 'HeaderTypo'
  | 'HeaderLogo'
  | 'DownTriangle'
  | 'SplashLogo'
  | 'LogoSeoulsync';

export type SNSIcon = 'Kakao' | 'Naver' | 'Google';

export type IconProps = {
  name: SVGName | string;
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
  style?: string;
  onClick?: () => void;
};
