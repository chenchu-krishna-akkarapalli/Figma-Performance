import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackName?: string;
}

// Generate a placeholder avatar URL based on name
const getPlaceholderUrl = (name: string, size: number = 100) =>
  `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(name)}&size=${size}&bold=true`;

export function OptimizedImage({ src, alt, className = '', fallbackName = 'User' }: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine the size based on className (for placeholder)
  const size = className.includes('w-[100px]') ? 100 : className.includes('w-[25px]') ? 50 : 100;
  const placeholderUrl = getPlaceholderUrl(fallbackName, size);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading the actual image
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };
            img.onerror = () => {
              setHasError(true);
              setIsLoading(false);
              setImageSrc(placeholderUrl);
            };
            img.src = src;
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, placeholderUrl]);

  return (
    <img
      ref={imgRef}
      src={isLoading ? placeholderUrl : (hasError ? placeholderUrl : imageSrc)}
      alt={alt}
      className={`${className} ${isLoading ? 'animate-pulse' : ''}`}
      loading="lazy"
      decoding="async"
    />
  );
}

export default OptimizedImage;
