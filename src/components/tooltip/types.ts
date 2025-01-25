import { IconProps } from '../svg-icon/type';

export type TooltipProps = {
  size: 'small' | 'medium';
  direction: TooltipDirections;
  svgIcon?: IconProps;
  content: string;
};

export type TooltipDirections =
  | 'topLeft'
  | 'topMiddle'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomMiddle'
  | 'bottomRight';
