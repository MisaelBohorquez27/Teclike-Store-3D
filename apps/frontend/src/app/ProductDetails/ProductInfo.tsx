import Button from "@/components/ui/PagesButtons";

export function ProductInfo({ product }: { product: any }) {
  return (
    <div className="pt-24 pb-7 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl mt-2">${product.price.toFixed(2)}</p>
      <Button 
      variant="primary"
      size="s"
      className="max-w-xs">
        Añadir al carrito
      </Button>
    </div>
  );
}