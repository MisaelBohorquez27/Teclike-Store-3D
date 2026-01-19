'use client';

import { useState } from 'react';

interface RatingProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  icon?: 'star' | 'heart' | 'thumbs';
  color?: 'yellow' | 'red' | 'blue' | 'green' | 'purple';
  half?: boolean;
}

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  showCount = false,
  count = 0,
  interactive = false,
  onChange,
  className = '',
  icon = 'star',
  color = 'yellow',
  half = false,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Configuración de tamaños
  const sizeConfig = {
    sm: { icon: 'text-sm', text: 'text-xs', gap: 'gap-0.5' },
    md: { icon: 'text-lg', text: 'text-sm', gap: 'gap-1' },
    lg: { icon: 'text-xl', text: 'text-base', gap: 'gap-1.5' },
    xl: { icon: 'text-2xl', text: 'text-lg', gap: 'gap-2' },
  };

  // Configuración de colores
  const colorConfig = {
    yellow: { active: 'text-yellow-400', hover: 'text-yellow-300' },
    red: { active: 'text-red-500', hover: 'text-red-400' },
    blue: { active: 'text-blue-500', hover: 'text-blue-400' },
    green: { active: 'text-green-500', hover: 'text-green-400' },
    purple: { active: 'text-purple-500', hover: 'text-purple-400' },
  };

  // Iconos
  const iconConfig = {
    star: { active: '★', inactive: '☆' },
    heart: { active: '❤️', inactive: '🤍' },
    thumbs: { active: '👍', inactive: '👎' },
  };

  const config = sizeConfig[size];
  const colors = colorConfig[color];
  const icons = iconConfig[icon];

  const displayValue = isHovering && interactive ? hoverValue : value;
  const roundedValue = half ? Math.round(displayValue * 2) / 2 : Math.round(displayValue);

  const handleClick = (newValue: number) => {
    if (interactive && onChange) {
      onChange(newValue);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverValue(index + 1);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovering(false);
      setHoverValue(0);
    }
  };

  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`flex items-center ${config.gap} ${className}`}>
      {/* Iconos de rating */}
      <div 
        className={`flex items-center ${config.gap}`}
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          let displayIcon = icons.inactive;
          let displayColor = 'text-gray-300';

          if (half) {
            // Rating con medias estrellas
            if (starValue <= roundedValue) {
              displayIcon = icons.active;
              displayColor = colors.active;
            } else if (starValue - 0.5 === roundedValue) {
              displayIcon = '⯨'; // Media estrella
              displayColor = colors.active;
            }
          } else {
            // Rating completo
            if (starValue <= roundedValue) {
              displayIcon = icons.active;
              displayColor = colors.active;
            } else if (interactive && starValue <= hoverValue) {
              displayIcon = icons.active;
              displayColor = colors.hover;
            }
          }

          return (
            <button
              key={index}
              type="button"
              className={`
                ${config.icon} 
                ${displayColor}
                transition-all duration-200 
                ${interactive 
                  ? 'cursor-pointer hover:scale-110 active:scale-95' 
                  : 'cursor-default'
                }
                ${isHovering && interactive && starValue <= hoverValue 
                  ? 'transform scale-110' 
                  : ''
                }
              `}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(index)}
              disabled={!interactive}
              aria-label={`Calificar con ${starValue} ${icon}${starValue === 1 ? '' : 's'}`}
            >
              {displayIcon}
            </button>
          );
        })}
      </div>

      {/* Información adicional */}
      {(showValue || showCount) && (
        <div className={`flex items-center ${config.gap} ${config.text} text-gray-600`}>
          {showValue && (
            <span className="font-medium min-w-10">
              {roundedValue.toFixed(half ? 1 : 0)}/{max}
            </span>
          )}
          
          {showValue && showCount && (
            <span className="text-gray-400">•</span>
          )}
          
          {showCount && count > 0 && (
            <span className="text-gray-500">
              ({formatCount(count)})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Componente para mostrar distribución de ratings
interface RatingDistributionProps {
  distribution: number[]; // [cantidad5estrellas, cantidad4estrellas, ...]
  total: number;
  className?: string;
}

export function RatingDistribution({ 
  distribution, 
  total, 
  className = '' 
}: RatingDistributionProps) {
  const maxCount = Math.max(...distribution);

  return (
    <div className={`space-y-2 ${className}`}>
      {distribution.map((count, index) => {
        const rating = distribution.length - index;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        const width = total > 0 ? (count / maxCount) * 100 : 0;

        return (
          <div key={rating} className="flex items-center gap-3 text-sm">
            <span className="w-6 text-gray-600 font-medium">{rating}</span>
            <span className="text-yellow-400">★</span>
            
            {/* Barra de progreso */}
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${width}%` }}
              />
            </div>
            
            <div className="w-16 text-right text-gray-500">
              {count > 0 ? (
                <>S
                  <span className="text-xs">{percentage.toFixed(0)}%</span>
                  <span className="text-xs ml-1">({count})</span>
                </>
              ) : (
                <span className="text-xs">0%</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}