'use client';

interface CarouselIndicatorsProps {
  items: any[];
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
  activeClass?: string;
  inactiveClass?: string;
  className?: string;
}

export function CarouselIndicators({
  items,
  currentIndex,
  onIndicatorClick,
  activeClass = 'bg-cyan-600 w-5',
  inactiveClass = 'bg-blue-600 w-3'
  
}: CarouselIndicatorsProps) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick(index)}
          className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
            currentIndex === index ? activeClass : inactiveClass
          }`}
          aria-label={`Ir al slide ${index + 1}`}
        />
      ))}
    </div>
  );
}