import React, { useState } from 'react';
import { cn } from '@/utils/tailwindcss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  fallbackPath?: string;
}

const Image = ({
  src,
  fallbackPath = '/images/img-fallback.svg',
  alt,
  width,
  height,
  className,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackPath) {
      setImgSrc(fallbackPath);
    }
  };

  const ImageFallback = () => {
    return (
      <div
        style={{
          width: width,
          height: height,
        }}
        className={cn('flex items-center justify-center border-[1px] border-gray-200', className)}
      >
        <img src={fallbackPath} alt="fallback" className="object-contain" />
      </div>
    );
  };

  if (!imgSrc) return <ImageFallback />;
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={cn(width && height && `w-[${width}px] h-[${height}px]`, className)}
      {...props}
    />
  );
};
export default Image;
