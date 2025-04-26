import * as React from 'react';
import type { SVGProps } from 'react';

const SvgIcoGoogle = ({ color, ...props }: SVGProps<SVGSVGElement>) => {
  const renderSvgPath = (fillColor: string) => (
    <>
      <mask
        id="ico-google_svg__a"
        width={10}
        height={9}
        x={11}
        y={9}
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <path
          fill={fillColor}
          d="M20.042 11.296c0-.645-.059-1.264-.168-1.858h-8.669v3.514h4.954a4.18 4.18 0 0 1-1.837 2.742v2.28h2.974c1.741-1.582 2.745-3.911 2.745-6.679z"
        />
      </mask>
      <g mask="url(#ico-google_svg__a)">
        <path fill={fillColor} d="M20 4.39H6.092V20H20z" />
      </g>
      <mask
        id="ico-google_svg__b"
        width={16}
        height={9}
        x={2}
        y={12}
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <path
          fill={fillColor}
          d="M11.206 20.172c2.485 0 4.569-.813 6.092-2.201l-2.974-2.28c-.824.545-1.88.868-3.117.868-2.397 0-4.427-1.598-5.15-3.747H2.98v2.355a9.21 9.21 0 0 0 8.226 5.005"
        />
      </mask>
      <g mask="url(#ico-google_svg__b)">
        <path fill={fillColor} d="M20 7.766H3V21h17z" />
      </g>
      <mask
        id="ico-google_svg__c"
        width={5}
        height={9}
        x={2}
        y={7}
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <path
          fill={fillColor}
          d="M6.055 12.813a5.4 5.4 0 0 1-.288-1.727c0-.599.104-1.181.288-1.726V7.006H2.979a8.99 8.99 0 0 0 0 8.161z"
        />
      </mask>
      <g mask="url(#ico-google_svg__c)">
        <path fill={fillColor} d="M11.17 1.959H2v18.258h9.17z" />
      </g>
      <mask
        id="ico-google_svg__d"
        width={16}
        height={8}
        x={2}
        y={2}
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <path
          fill={fillColor}
          d="M11.206 5.613c1.351 0 2.565.458 3.518 1.36l2.64-2.607C15.77 2.9 13.688 2 11.206 2A9.21 9.21 0 0 0 2.98 7.006L6.056 9.36c.724-2.147 2.753-3.747 5.15-3.747"
        />
      </mask>
      <g mask="url(#ico-google_svg__d)">
        <path fill={fillColor} d="M20 2H2v12h18z" />
      </g>
    </>
  );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" {...props}>
      {color ? (
        renderSvgPath(color)
      ) : (
        <>
          {renderSvgPath('#fff')}
          <g mask="url(#ico-google_svg__a)">
            <path fill="#3E82F1" d="M20 4.39H6.092V20H20z" />
          </g>
          <g mask="url(#ico-google_svg__b)">
            <path fill="#32A753" d="M20 7.766H3V21h17z" />
          </g>
          <g mask="url(#ico-google_svg__c)">
            <path fill="#F9BB00" d="M11.17 1.959H2v18.258h9.17z" />
          </g>
          <g mask="url(#ico-google_svg__d)">
            <path fill="#E74133" d="M20 2H2v12h18z" />
          </g>
        </>
      )}
    </svg>
  );
};

export default SvgIcoGoogle;
