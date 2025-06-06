import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoMyPageActive = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.color || '#353D4A'}
      stroke={props.color || '#353D4A'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.114 11.229a4.114 4.114 0 1 0 0-8.23 4.114 4.114 0 0 0 0 8.23"
    />
    <path fill={props.color || '#353D4A'} d="M4 21c0-3.6 3.135-7.2 8.229-7.2s8.228 3.6 8.228 7.2" />
    <path
      stroke={props.color || '#353D4A'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 21c0-3.6 3.135-7.2 8.229-7.2s8.228 3.6 8.228 7.2z"
    />
  </svg>
);
export default SvgIcoMyPageActive;
