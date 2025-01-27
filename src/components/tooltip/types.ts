export type TooltipProps = {
  size: 'small' | 'medium';
  direction: TooltipDirections;
  message: string;
  isBubble: boolean;
  className?: string;
};

export type TooltipDirections =
  | 'topLeft'
  | 'topMiddle'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomMiddle'
  | 'bottomRight';
