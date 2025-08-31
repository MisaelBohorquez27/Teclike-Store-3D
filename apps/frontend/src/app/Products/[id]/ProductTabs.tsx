export function ProductTabs({
  specifications
}: {
  specifications: Record<string, string>;
}) {
  return (
    <div className="mt-2">
      <h3 className="text-xl font-semibold">Especificaciones</h3>
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