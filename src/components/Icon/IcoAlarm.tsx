import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoAlarm = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" {...props}>
    <path
      fill={props.color || '#000'}
      fillRule="evenodd"
      d="M14.97 6a7.024 7.024 0 0 1 7.02 6.783l.004.241v3.777l1.828 3.657a1.104 1.104 0 0 1-.872 1.592l-.116.005H7.104a1.104 1.104 0 0 1-1.033-1.492l.046-.105 1.828-3.657v-3.777A7.024 7.024 0 0 1 14.969 6m0 2.007a5.017 5.017 0 0 0-5.013 4.8l-.005.217v3.777c0 .25-.046.496-.136.728l-.076.17-1.174 2.35h12.807l-1.174-2.35a2 2 0 0 1-.203-.712l-.01-.186v-3.777a5.02 5.02 0 0 0-5.017-5.017"
      clipRule="evenodd"
    />
    <path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M12.963 24.06c1.505.502 2.509.502 4.014 0M15 5v1.003"
    />
  </svg>
);
export default SvgIcoAlarm;
