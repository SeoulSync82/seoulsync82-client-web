import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke={props.color || '#212529'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 7 10 17l-5-5"
    />
  </svg>
);
export default SvgIcoCheck;
