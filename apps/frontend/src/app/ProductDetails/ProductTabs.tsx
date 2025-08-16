export function ProductTabs({
  description,
  specifications
}: {
  description: string;
  specifications: Record<string, string>;
}) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-xl font-semibold">Descripción</h3>
      <p className="mt-2">{description}</p>
      
      <h3 className="text-xl font-semibold mt-6">Especificaciones</h3>
      <ul className="mt-2 space-y-2">
        {Object.entries(specifications).map(([key, value]) => (
          <li key={key} className="flex">
            <span className="font-medium w-1/3">{key}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}