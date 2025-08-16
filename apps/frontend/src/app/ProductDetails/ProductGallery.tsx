export function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-4">
      {images.map((img, index) => (
        <img 
          key={index}
          src={img}
          alt={`Vista ${index + 1} del producto`}
          className="w-full rounded-lg border"
        />
      ))}
    </div>
  );
}