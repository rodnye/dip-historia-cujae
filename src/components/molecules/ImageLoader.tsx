import { useState, useEffect } from 'react';
import { Loader } from '../atom/Loader';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  loaderClassName?: string;
}

export const ImageLoader = ({
  src,
  alt,
  className = '',
  loaderClassName = '',
}: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setIsLoading(false);
      setImageError(false);
    };

    image.onerror = () => {
      setIsLoading(false);
      setImageError(true);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${loaderClassName}`}>
        <Loader />
      </div>
    );
  }

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
      >
        <span className="text-gray-500">Error al cargar la imagen</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
};
