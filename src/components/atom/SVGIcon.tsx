import { ReactElement } from 'react';

import homeIcon from '@/assets/icons/ic_home.svg?react';
import homeIconActive from '@/assets/icons/ic_home_active.svg?react';

export type IconType = 'home';

type IconProps = {
  name: IconType;
  color?: string;
  size: number;
  active: boolean;
};

export const SVGIcon = ({ size, name, active }: IconProps): ReactElement => {
  const iconTypes = {
    home: active ? homeIconActive : homeIcon,
  };
  const SVGIcon = iconTypes[name];

  return <SVGIcon width={size} height={size} />;
};

export default SVGIcon;
