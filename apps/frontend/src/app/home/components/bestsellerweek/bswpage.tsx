"use client";

import { useCartContext } from "@/context/cartcontext";
import { BestSellersWeekGrid } from "./components/bswgrid";

export function BestSellersWeekPage() {
    const { addToCart } = useCartContext();

    const handleAddToCart = async (productId: number, quantity: number) => {
        try {
            await addToCart(productId, quantity);
            // Puedes agregar feedback visual aquí
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Grid de mejores vendedores */}
            <BestSellersWeekGrid onAddToCart={handleAddToCart} />
        </div>
    );
}