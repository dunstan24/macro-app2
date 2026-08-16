import React from "react";

interface Props {
  className?: string;
  imageUrl?: string;
}

export const SmoothieCup: React.FC<Props> = ({
  className = "w-full h-full",
  imageUrl,
}) => {
  const [loaded, setLoaded] = React.useState(false);

  if (imageUrl) {
    return (
      <div
        className={`relative flex justify-center items-center overflow-hidden rounded-xl bg-gray-900/40 ${className}`}
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gray-800/80 animate-pulse flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-600 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
        <img
          src={imageUrl}
          alt="Smoothie Drink"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
        {/* Subtle glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // A minimalist wireframe cup that acts as a sleek "empty preview" placeholder
  const cupPath = `M 30,20 L 90,20 L 82,155 Q 82,165 72,165 L 48,165 Q 38,165 38,155 Z`;

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg
        viewBox="0 0 120 180"
        className="w-full h-full opacity-30 dark:opacity-40"
      >
        {/* Background / Body of the cup (subtle) */}
        <path d={cupPath} fill="currentColor" fillOpacity="0.05" />

        {/* Main Outline */}
        <path
          d={cupPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle glass reflection details */}
        <path
          d="M 45,35 L 42,145"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />
        <path
          d="M 82,35 L 79,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />

        {/* Straw (Wireframe) */}
        <path
          d="M 60,30 L 60,10 L 75,-5"
          fill="none"
          stroke="#CA210E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </svg>
    </div>
  );
};
