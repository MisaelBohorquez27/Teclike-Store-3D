export function ProductTabs({
  specifications
}: {
  specifications: Record<string, string>;
}) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Especificaciones</h3>
      <div className="space-y-4">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:border-gray-600/50 transition-colors">
            <span className="font-semibold text-gray-300 w-1/3">{key}:</span>
            <span className="text-gray-100 text-right flex-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}