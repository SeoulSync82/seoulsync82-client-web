import React, { useState } from 'react';
import { cn } from '@/utils/tailwindcss';

export type ImageFallbackStatus = 'normal' | 'bad' | 'loading';
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  objectFit?: ImageFit;
  rounded?: boolean | string;
  fallbackPath?: string;
  fallbackWidth?: number | string;
  fallbackHeight?: number | string;
  fallbackBgColor?: string;
  fallbackStatus?: ImageFallbackStatus;
  lazy?: boolean;
  placeholder?: React.ReactNode;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  width,
  height,
  className = '',
  objectFit = 'cover',
  rounded = false,
  fallbackPath,
  fallbackWidth = 100,
  fallbackHeight = 100,
  fallbackBgColor = 'white',
  fallbackStatus = 'normal',
  lazy = true,
  placeholder,
  onLoadSuccess,
  onLoadError,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadSuccess?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImgSrc(fallbackPath || `/images/img-fallback-${fallbackStatus}.svg`);
    onLoadError?.();
  };

  const roundedClass =
    typeof rounded === 'boolean' ? (rounded ? 'rounded-md' : '') : `rounded-${rounded}`;

  const renderImage = () => (
    <img
      style={{
        minWidth: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      src={imgSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      loading={lazy ? 'lazy' : undefined}
      className={cn(
        `object-${objectFit}`,
        roundedClass,
        isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300',
        className,
      )}
      {...rest}
    />
  );

  const renderFallback = () => (
    <div
      style={{
        minWidth: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className={cn(
        'flex items-center justify-center border-[1px] border-gray-200',
        `bg-${fallbackBgColor}`,
        roundedClass,
        className,
      )}
    >
      <img
        style={{
          width: typeof fallbackWidth === 'number' ? `${fallbackWidth}px` : fallbackWidth,
          height: typeof fallbackHeight === 'number' ? `${fallbackHeight}px` : fallbackHeight,
        }}
        src={fallbackPath || `/images/img-fallback-${fallbackStatus}.svg`}
        alt={`${alt} fallback`}
        className="object-contain"
      />
    </div>
  );

  // TODO: skeleton 추가
  // const renderPlaceholder = () => (
  //   <div
  //     style={{
  //       width: typeof width === 'number' ? `${width}px` : width,
  //       height: typeof height === 'number' ? `${height}px` : height,
  //     }}
  //     className={cn('flex items-center justify-center bg-gray-100', roundedClass, className)}
  //   >
  //     {placeholder || <div className="h-full w-full animate-pulse bg-gray-200" />}
  //   </div>
  // );

  // if (isLoading && !hasError) {
  //   return renderPlaceholder();
  // }

  return hasError || !imgSrc ? renderFallback() : renderImage();
};

export default Image;
