import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcoFullStar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.color || '#DEE2E6'}
      d="M11.571 3.28a.469.469 0 0 1 .858 0l2.41 5.122a.48.48 0 0 0 .36.274l5.391.821c.392.06.549.565.265.855l-3.9 3.987a.52.52 0 0 0-.138.444l.92 5.63c.068.41-.342.722-.693.528l-4.821-2.658a.46.46 0 0 0-.446 0l-4.821 2.658c-.35.194-.76-.119-.694-.528l.921-5.63a.52.52 0 0 0-.137-.444l-3.901-3.987c-.284-.29-.127-.795.265-.855l5.39-.821a.48.48 0 0 0 .36-.274z"
    />
  </svg>
);
export default SvgIcoFullStar;
