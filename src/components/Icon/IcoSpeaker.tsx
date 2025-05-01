import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoSpeaker = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill={props.color || '#000'}
      fillRule="evenodd"
      d="m12.737 5.893-4.184 2.79v6.775l4.184 2.79zm-.133-1.715a1.05 1.05 0 0 1 1.633.874v14.037a1.05 1.05 0 0 1-1.633.873l-5.084-3.39-.044-.03H3.75A1.75 1.75 0 0 1 2 14.791v-5.58c0-.966.784-1.75 1.75-1.75h3.928zM7.053 8.962v6.08H3.75a.25.25 0 0 1-.25-.25v-5.58a.25.25 0 0 1 .25-.25zM19.3 5.182a.75.75 0 1 0-1.06 1.06 8.25 8.25 0 0 1 0 11.668.75.75 0 1 0 1.06 1.06 9.75 9.75 0 0 0 0-13.788m-2.651 2.652a.75.75 0 0 0-1.061 1.06 4.5 4.5 0 0 1 0 6.364.75.75 0 0 0 1.06 1.06 6 6 0 0 0 0-8.484"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgIcoSpeaker;
