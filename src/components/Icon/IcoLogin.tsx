import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoLogin = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.color || '#212529'}
      d="M5.634 20a2.585 2.585 0 0 1-2.584-2.584v-11a2.584 2.584 0 0 1 2.328-2.57l.256-.013h7.333a.75.75 0 0 1 0 1.5H5.634l-.108.005a1.085 1.085 0 0 0-.976 1.078v11A1.085 1.085 0 0 0 5.634 18.5h7.333a.75.75 0 0 1 0 1.5z"
    />
    <path
      fill={props.color || '#212529'}
      d="M14.423 7.544a.536.536 0 0 0-.786.023l-2.685 3.913a.61.61 0 0 0 0 .807l2.685 3.913c.21.235.563.245.786.022a.61.61 0 0 0 .022-.829l-1.798-2.923h7.597c.307 0 .556-.263.556-.587s-.249-.586-.556-.586h-7.597l1.798-2.923a.61.61 0 0 0-.022-.83"
    />
  </svg>
);
export default SvgIcoLogin;
