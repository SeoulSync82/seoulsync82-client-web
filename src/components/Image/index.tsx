import React, { useState } from 'react';
import { cn } from '@/utils/tailwindcss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  fallbackPath?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  fallbackPath = '/images/img-fallback.svg',
  alt,
  width,
  height,
  className,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  const handleError = () => {
    setImgSrc(fallbackPath);
  };

  const renderImage = () => (
    <img
      style={{ width, height }}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={cn(
        'aspect-[1/1] w-full object-cover',
        width && height && `w-[${width}px] h-[${height}px]`,
        className,
      )}
      {...rest}
    />
  );

  const renderFallback = () => (
    <div
      style={{ width, height }}
      className={cn(
        'flex aspect-[1/1] items-center justify-center border-[1px] border-gray-200',
        className,
      )}
    >
      <img src={fallbackPath} alt="fallback" className="object-contain" />
    </div>
  );

  return imgSrc ? renderImage() : renderFallback();
};

export default Image;
