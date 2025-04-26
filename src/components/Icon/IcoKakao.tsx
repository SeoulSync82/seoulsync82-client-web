import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoKakao = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" {...props}>
    <path
      fill={props.color || '#391B1B'}
      d="M11 3C6.03 3 2 6.082 2 9.884c0 2.475 1.707 4.643 4.27 5.857-.189.68-.682 2.464-.781 2.845-.122.474.18.468.377.34.154-.1 2.466-1.62 3.463-2.276q.814.117 1.671.118c4.97 0 9-3.082 9-6.884S15.97 3 11 3"
    />
  </svg>
);
export default SvgIcoKakao;
