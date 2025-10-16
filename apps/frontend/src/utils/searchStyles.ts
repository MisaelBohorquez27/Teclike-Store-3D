export function getVariantStyles(variant: string) {
  switch (variant) {
    case "minimal":
      return "border-0 bg-transparent px-2 py-1";
    case "expanded":
      return "px-6 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 rounded-full";
    default:
      return "px-4 py-2 border border-transparent rounded-l-lg";
  }
}

export function getContainerStyles(variant: string) {
  switch (variant) {
    case "minimal":
      return "border-b border-gray-200";
    case "expanded":
      return "bg-white rounded-full shadow-lg";
    default:
      return "bg-white rounded-lg border border-gray-300 focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500";
  }
}
