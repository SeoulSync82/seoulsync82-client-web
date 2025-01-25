export type TooltipProps = {
  size: 'small' | 'medium';
  direction: TooltipDirections;
  content: string;
  isBubble: boolean;
};

export type TooltipDirections =
  | 'topLeft'
  | 'topMiddle'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomMiddle'
  | 'bottomRight';
