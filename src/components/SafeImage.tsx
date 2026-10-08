import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  category?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  category = 'Journal'
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${aspectRatioClass} ${className}`}>
      {/* Background Editorial Placeholder Pattern */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-300 ${
          loaded && !error ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-10 h-10 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-xs tracking-widest font-mono text-stone-500 dark:text-stone-400 mb-2">
          NX
        </div>
        <span className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-sans">
          {category}
        </span>
      </div>

      {!error ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ) : null}
    </div>
  );
};
