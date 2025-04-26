import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoNaver = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" {...props}>
    <path
      fill={props.color || '#fff'}
      d="M14.156 11.592 7.494 2H2v18h5.844v-9.592L14.507 20H20V2h-5.844z"
    />
  </svg>
);
export default SvgIcoNaver;
