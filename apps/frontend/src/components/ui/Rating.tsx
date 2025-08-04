'use client';

export function Rating({ value = 0 }: { value?: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span 
          key={i} 
          className={`text-xl ${i < value ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-500 text-sm ml-2">({value.toFixed(1)})</span>
    </div>
  );
}