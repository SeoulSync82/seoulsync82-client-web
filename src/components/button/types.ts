export type NavbarIcon = 'Home' | 'MyCourse' | 'AiRecommend' | 'Community' | 'MyPage';

export type NavbarIconActive =
  | 'HomeActive'
  | 'MyCourseActive'
  | 'AiRecommendActive'
  | 'CommunityActive'
  | 'MyPageActive';

export type Icon =
  | NavbarIcon
  | NavbarIconActive
  | 'Alarm'
  | 'Search'
  | 'LeftArrow'
  | 'MenuLogo'
  | 'HeaderTypo'
  | 'HeaderLogo';

export type IconProps = {
  name: Icon;
  color?: string;
  width?: number;
  height?: number;
  active?: boolean;
  style?: string;
  onClick?: () => void;
};

export type ButtonSizeType = 'small' | 'medium' | 'large';
export type EtcSizeType = 'small' | 'medium';
export type SpeechBubbleDirectionType =
  | 'topLeft'
  | 'topMiddle'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomMiddle'
  | 'bottomRight';

export type ButtonBorderType = {
  position: 'top' | 'left' | 'right' | 'bottom' | 'x' | 'y';
  size: ButtonSizeType;
};

export type ButtonClickPropsType = {
  key: string;
  content: string;
};

export type ButtonProps = {
  size: ButtonSizeType;
  bgColor: ButtonColorType;
  textColor: ButtonColorType;
  content: string;
  svgIcon?: IconProps;
  border?: ButtonBorderType;
  borderColor?: ButtonColorType;
  isActive?: boolean;
  onClick?: () => void;
  disabled: boolean;
};

export type ButtonColorType =
  | 'primary'
  | 'naverGreen'
  | 'kakaoYellow'
  | 'googleGray'
  | 'white'
  | 'gray900'
  | 'gray100'
  | 'gray200'
  | 'gray400';
