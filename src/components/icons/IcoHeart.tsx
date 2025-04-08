import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcoHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke={props.color || '#6D757D'}
      strokeWidth={1.5}
      d="m11.454 6.555.504.459.505-.459.22-.2c.958-.876 1.756-1.605 2.921-1.605 1.243 0 2.43.5 3.3 1.384a4.7 4.7 0 0 1 1.346 3.29v.003a4.7 4.7 0 0 1-1.347 3.29c-.466.476-2.282 1.993-4.036 3.432a499 499 0 0 1-2.878 2.342 174 174 0 0 1-2.459-1.938c-1.603-1.29-3.43-2.815-4.435-3.837a4.7 4.7 0 0 1 0-6.58l.003-.004c.835-.858 1.966-1.378 3.137-1.38 1.27-.001 1.97.647 2.893 1.502q.158.147.326.3Z"
    />
  </svg>
);
export default SvgIcoHeart;
