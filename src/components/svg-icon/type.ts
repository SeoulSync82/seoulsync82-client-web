import { NavbarIcon, NavbarIconActive } from '../navigation/types';

// export type Icon =
//   | NavbarIcon
//   | NavbarIconActive
//   | SNSIcon
//   | 'Alarm'
//   | 'Search'
//   | 'ArrowLeft'
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
  | 'MenuLogo'
  | 'HeaderTypo'
  | 'HeaderLogo'
  | 'DownTriangle'
  | 'SplashLogo'
  | 'LogoSeoulsync'
  | 'ArrowLeft';

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
