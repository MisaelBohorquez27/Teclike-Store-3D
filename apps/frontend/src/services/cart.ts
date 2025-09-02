// services/cart.ts
export interface CartProduct {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    inStock: boolean;
    stock: number;
  };
}

export interface CartResponse {
  id: number;
  userId: number;
  items: CartProduct[];
}

// services/cart.ts
export async function fetchCart(): Promise<CartResponse> {
  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener el carrito");
    }

    const cartData = await res.json();

    // Validar la estructura de los datos
    if (!cartData || typeof cartData !== "object") {
      throw new Error("Formato de respuesta inválido");
    }

    // Asegurar que items sea un array
    if (!Array.isArray(cartData.items)) {
      cartData.items = [];
    }

    // Validar cada item
    cartData.items = cartData.items.map((item: any) => ({
      id: item.id || 0,
      productId: item.productId || 0,
      quantity: item.quantity || 1,
      product: {
        id: item.product?.id || 0,
        name: item.product?.name || "Producto sin nombre",
        description: item.product?.description || "",
        price: item.product?.price || 0, // Valor por defecto
        imageUrl: item.product?.imageUrl,
        inStock: item.product?.inStock || false,
        stock: item.product?.stock || 0,
      },
    }));

    return cartData;
  } catch (error) {
    console.error("Error en fetchCart:", error);
    // Devolver un carrito vacío en caso de error
    return {
      id: 0,
      userId: 0,
      items: [],
    };
  }
}
