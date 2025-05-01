import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.color || '#212529'}
      d="M5.634 20a2.585 2.585 0 0 1-2.584-2.584v-11a2.584 2.584 0 0 1 2.328-2.57l.256-.013h7.333a.75.75 0 0 1 0 1.5H5.634l-.108.005a1.085 1.085 0 0 0-.976 1.078v11A1.085 1.085 0 0 0 5.634 18.5h7.333a.75.75 0 0 1 0 1.5zm12.33-3.8a.536.536 0 0 1-.787.023.61.61 0 0 1-.021-.83l1.798-2.923h-7.598c-.307 0-.556-.263-.556-.587s.25-.587.556-.587h7.598l-1.798-2.923a.61.61 0 0 1 .021-.83.536.536 0 0 1 .787.023l2.684 3.914a.61.61 0 0 1 0 .806z"
    />
  </svg>
);
export default SvgIcoLogout;
