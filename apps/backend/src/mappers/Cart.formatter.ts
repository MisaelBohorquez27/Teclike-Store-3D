const TAX_RATE = 0.08;
const SHIPPING_THRESHOLD = 100; // envío gratis a partir de $100
const DEFAULT_SHIPPING = 9.99;

export function transformCart(cart: any) {
  // Retornar carrito vacío en lugar de null
  if (!cart) {
    return {
      id: 0,
      userId: 0,
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    };
  }

  const items = (cart.cartProducts || []).map((item: any) => {
    const priceCents = item.product?.priceCents || 0;
    const price = priceCents / 100;
    const stock = item.product?.inventory?.stock || 0;

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product?.id,
        name: item.product?.name || "Producto sin nombre",
        description: item.product?.description || "",
        priceCents: priceCents,
        price: price,
        priceString: "$" + price.toFixed(2),
        imageUrl: item.product?.imageUrl || null,
        inStock: stock > 0,
        stock: stock,
      },
    };
  });

  // Calcular subtotal
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  // Calcular impuestos
  const tax = Number((subtotal * TAX_RATE).toFixed(2));

  // Calcular envío
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DEFAULT_SHIPPING;

  // Calcular total
  const total = Number((subtotal + tax + shipping).toFixed(2));

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
  };
}
