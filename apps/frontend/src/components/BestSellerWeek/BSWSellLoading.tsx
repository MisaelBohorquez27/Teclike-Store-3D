// TopProductsSellLoading.tsx
export function TopProductsSellLoading() {
  return <p className="TextColor">Cargando productos...</p>;
}

// TopProductsSellError.tsx
interface ErrorProps {
  error: string;
}

export function TopProductsSellError({ error }: ErrorProps) {
  return (
    <div className="BestSellersWeek-bg py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="TextColor text-red-500">{error}</p>
      </div>
    </div>
  );
}